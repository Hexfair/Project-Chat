import { MessageService } from './../message/message.service';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Message } from 'src/message/entities/message.entity';
//===========================================================================================================

@Module({
	imports: [TypeOrmModule.forFeature([Room, User, Message])],
	controllers: [RoomController],
	providers: [RoomService, UserService, MessageService, JwtStrategy],
})
export class RoomModule {}
