import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';
import { GetMoreMessagesDto } from './dto/getmore-messages.dto';
//===========================================================================================================

@Controller('message')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('getMore')
	getMoreMessages(@Body() getMoreMessagesDto: GetMoreMessagesDto) {
		return this.messageService.getMoreMessages(getMoreMessagesDto);
	}
}
