import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { HashingPassword } from 'src/helpers/password-hashing.helper';
import { ValidationPassword } from 'src/helpers/password-validation.helper';
import { JwtService } from '@nestjs/jwt';
import { IUserAuth } from 'src/auth/interfaces/user-auth.interface';
import { UserService } from 'src/user/user.service';
import { ActivateAuthDto } from './dto/activate-auth.dto';
//===========================================================================================================

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	/* Регистрация пользователя */
	async register(registerUserDto: RegisterAuthDto) {
		const checkUser = await this.userRepository.findOne({
			where: { email: registerUserDto.email },
		});

		if (checkUser)
			throw new BadRequestException(
				'Пользователь с таким email уже зарегистрирован',
			);

		const passwordHash = await HashingPassword(registerUserDto.password);
		const activationCode = Math.round(Math.random() * 100000);
		const code =
			activationCode.toString().length === 5
				? activationCode
				: activationCode * 10;

		await this.userRepository.save({
			email: registerUserDto.email,
			password: passwordHash,
			username: registerUserDto.username,
			status: 'chat user',
			avatarUrl: '',
			code,
		});

		setTimeout(() => {
			this.userRepository
				.createQueryBuilder('user')
				.where('email = :email', { email: registerUserDto.email })
				.andWhere('code = :code', { code })
				.delete()
				.execute();
		}, 1200000);

		return { message: 'Регистрация прошла успешно' };
	}

	/* Активация аккаунта пользователя */
	async activate(activateUserDto: ActivateAuthDto) {
		const user = await this.userRepository.findOne({
			where: { email: activateUserDto.email },
		});

		const codeNumber = Number(activateUserDto.code);
		if (Number.isNaN(codeNumber))
			throw new BadRequestException(
				'Ошибка при активации. Проверьте введеный вами код доступа',
			);
		if (!user || user.code !== codeNumber)
			throw new BadRequestException(
				'Ошибка при активации. Проверьте введеный вами код доступа',
			);

		await this.userRepository.update(user.id, { code: 1 });

		return await this.login(user);
	}

	/* Вход в аккаунт пользователя */
	async login(user: IUserAuth) {
		const { id, email, username, status, avatarUrl } = user;
		return {
			id,
			email,
			username,
			status,
			avatarUrl,
			token: this.jwtService.sign({ id: user.id, email: user.email }),
		};
	}

	/* Получение данных пользователя */
	async getProfile(user: IUserAuth) {
		const userData = await this.userService.findOne(user.id);
		if (!userData)
			throw new BadRequestException('Ошибка при получении данных пользователя');

		const result = {
			id: userData.id,
			username: userData.username,
			email: userData.email,
			status: userData.status,
			avatarUrl: userData.avatarUrl,
		};

		return result;
	}

	/* Проверка данных пользователя (для local.strategy) */
	async validateUser(email: string, password: string): Promise<IUserAuth> {
		const user = await this.userRepository.findOne({
			where: { email },
		});
		if (!user)
			throw new UnauthorizedException(
				'Неверный логин или пароль. Проверьте правильность введеных данных',
			);

		const checkPassword = await ValidationPassword(password, user.password);
		if (!checkPassword)
			throw new UnauthorizedException(
				'Неверный логин или пароль. Проверьте правильность введеных данных',
			);

		return user;
	}
}
