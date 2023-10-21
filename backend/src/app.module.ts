import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Room } from './room/entities/room.entity';
import { Message } from './message/entities/message.entity';
import { SocketModule } from './socket/socket.module';
import { FilesModule } from './files/files.module';
//===========================================================================================================

@Module({
	imports: [
		UserModule,
		RoomModule,
		MessageModule,
		AuthModule,
		SocketModule,
		FilesModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				entities: [User, Room, Message],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
})
export class AppModule {}
