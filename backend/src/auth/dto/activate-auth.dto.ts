import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//===========================================================================================================

export class ActivateAuthDto {
	@IsEmail({}, { message: 'Ошибка при активации аккаунта' })
	email: string;

	@IsString()
	@IsNotEmpty()
	code: string;
}
