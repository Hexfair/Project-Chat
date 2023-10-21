import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
//===========================================================================================================

@Module({
	imports: [TypeOrmModule.forFeature([Message, Room, User])],
	controllers: [MessageController],
	providers: [MessageService, JwtStrategy],
})
export class MessageModule {}
