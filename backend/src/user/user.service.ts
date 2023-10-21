import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { INewUserData } from 'src/socket/interfaces/update-user.interface copy';
//===========================================================================================================

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	/* Поиск пользователя по имени */
	async searchByName(searchValue: string) {
		const users = await this.userRepository
			.createQueryBuilder('user')
			.select(['user.id', 'user.username', 'user.status', 'user.avatarUrl'])
			.where('user.username ILIKE :username', { username: `%${searchValue}%` })
			.getMany();
		return users;
	}

	/* Поиск одного пользователя по id */
	async findOne(id: number) {
		return await this.userRepository.findOne({
			where: { id },
		});
	}

	/* Обновление данных пользователя */
	async update(id: number, updateUserData: INewUserData) {
		return await this.userRepository
			.createQueryBuilder()
			.update(User)
			.set({
				username: updateUserData.username,
				status: updateUserData.status,
				avatarUrl: updateUserData.avatarUrl,
			})
			.where('id = :id', { id })
			.execute();
	}
}
