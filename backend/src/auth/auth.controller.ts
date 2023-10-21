import {
	Controller,
	Get,
	Post,
	Body,
	Request,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as RequestWithUser } from 'express';
import { ActivateAuthDto } from './dto/activate-auth.dto';
//===========================================================================================================

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	register(@Body() registerUserDto: RegisterAuthDto) {
		return this.authService.register(registerUserDto);
	}

	@UsePipes(new ValidationPipe())
	@Post('activate')
	activate(@Body() activateUserDto: ActivateAuthDto) {
		return this.authService.activate(activateUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req: RequestWithUser) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getProfile(@Request() req: RequestWithUser) {
		return this.authService.getProfile(req.user);
	}
}
