import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
//===========================================================================================================
@Module({
	imports: [TypeOrmModule.forFeature([Message, Room, User])],
	providers: [SocketGateway, MessageService, UserService, RoomService],
})
export class SocketModule {}
