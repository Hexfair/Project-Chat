import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';
import { IMessage } from 'src/message/interfaces/message.interface';
//===========================================================================================================

@Injectable()
export class RoomService {
	constructor(
		@InjectRepository(Room) private readonly roomRepository: Repository<Room>,
		private readonly userService: UserService,
		private readonly messageService: MessageService,
	) {}

	/* Создание диалога между двумя пользователями*/
	async create(createRoomDto: CreateRoomDto, userId: number) {
		const user1 = await this.userService.findOne(userId);
		const user2 = await this.userService.findOne(createRoomDto.partnerId);
		if (!user1 || !user2)
			throw new BadRequestException(
				'Ошибка при создании диалога. Возможно, вы не зарегистрированы',
			);

		const checkedRoom = await this.roomRepository.findOne({
			where: [
				{ user1: { id: userId }, user2: { id: createRoomDto.partnerId } },
				{ user1: { id: createRoomDto.partnerId }, user2: { id: userId } },
			],
		});
		if (checkedRoom)
			throw new BadRequestException(
				'Ошибка при создании диалога. Возможно, такой диалог уже создан',
			);

		const roomData = {
			user1,
			user2,
		};
		return await this.roomRepository.save(roomData);
	}

	/* Получение всех диалогов пользователя */
	async findUserDialogs(userId: number) {
		const rooms = await this.roomRepository.find({
			relations: {
				user1: true,
				user2: true,
				messages: {
					user: true,
				},
			},
			where: [{ user1: { id: userId } }, { user2: { id: userId } }],
			order: {
				updatedAt: 'ASC', // "DESC" | "ASC"
			},
		});

		const detailedRooms = await Promise.all(
			rooms.map(async (obj: Room) => {
				const messages = await this.messageService.findByRoomId(obj.id);
				const arrayMessages: IMessage[] = [];
				for (let i = 0; i <= messages.length - 1; i++) {
					const mainPropertiesMessage = {
						id: messages[i].id,
						text: messages[i].text,
						imagesUrl: messages[i].imagesUrl,
						audioUrl: messages[i].audioUrl,
						status: messages[i].status,
						createdAt: messages[i].createdAt,
						user: messages[i].user.id,
					};
					arrayMessages.push(mainPropertiesMessage);
				}

				const sortMessages = arrayMessages.sort(
					(a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
				);

				let lastScrollMessageId: number | null = null;
				for (let i = 0; i <= sortMessages.length - 1; i++) {
					if (
						sortMessages[i].user !== userId &&
						sortMessages[i].status === false
					) {
						lastScrollMessageId = sortMessages[i].id;
						break;
					}
				}

				const room = {
					id: obj.id,
					createdAt: obj.createdAt,
					lastScrollMessageId:
						lastScrollMessageId || sortMessages[sortMessages.length - 1]?.id,
					user1: {
						id: obj.user1.id,
						username: obj.user1.username,
						email: obj.user1.email,
						status: obj.user1.status,
						avatarUrl: obj.user1.avatarUrl,
					},
					user2: {
						id: obj.user2.id,
						username: obj.user2.username,
						email: obj.user2.email,
						status: obj.user2.status,
						avatarUrl: obj.user2.avatarUrl,
					},
					messages: sortMessages,
				};
				return room;
			}),
		);

		return detailedRooms;
	}

	/* Получить конкретый диалог по его id */
	async findOne(id: number) {
		return await this.roomRepository.findOne({
			relations: {
				user1: true,
				user2: true,
			},
			where: {
				id: id,
			},
		});
	}

	/* Поиск среди пользователей по имени */
	async searchUsersByName(searchValue: string, userId: number) {
		const users = await this.userService.searchByName(searchValue);
		if (!users) return [];
		const rooms = await this.roomRepository.find({
			relations: {
				user1: true,
				user2: true,
			},
			where: [{ user1: { id: userId } }, { user2: { id: userId } }],
		});

		const arrRoomsId: number[] = [userId];
		for (let i = 0; i <= rooms.length - 1; i++) {
			if (!arrRoomsId.includes(rooms[i].user1.id))
				arrRoomsId.push(rooms[i].user1.id);
			if (!arrRoomsId.includes(rooms[i].user2.id))
				arrRoomsId.push(rooms[i].user2.id);
		}

		const arrUsersId: any[] = [];
		for (let i = 0; i <= users.length - 1; i++) {
			if (!arrRoomsId.includes(users[i].id)) arrUsersId.push(users[i]);
		}
		return arrUsersId;
	}
}
