import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
//===========================================================================================================

export class RegisterAuthDto {
	@IsEmail({}, { message: 'Неверный адрес электронной почты' })
	email: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@MinLength(3, { message: 'Пароль должен содержать не менее трех символов' })
	@IsString()
	password: string;
}
