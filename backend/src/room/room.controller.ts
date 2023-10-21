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
import { Request as RequestWithUser } from 'express';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
//===========================================================================================================

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Post('create')
	create(
		@Body() createRoomDto: CreateRoomDto,
		@Request() req: RequestWithUser,
	) {
		return this.roomService.create(createRoomDto, req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getAll')
	findUserDialogs(@Request() req: RequestWithUser) {
		return this.roomService.findUserDialogs(req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Post('search')
	searchUsersByName(
		@Body() body: { searchValue: string },
		@Request() req: RequestWithUser,
	) {
		return this.roomService.searchUsersByName(body.searchValue, req.user.id);
	}
}
