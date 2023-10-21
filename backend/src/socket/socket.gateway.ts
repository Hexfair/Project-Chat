import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { ICreateFirstMessage } from './interfaces/create-first-message.interface';
import { ICreateMessage } from './interfaces/create-message.interface copy';
import { ICreateFileMessage } from './interfaces/create-file-message.interface';
import { IReadedMessage } from './interfaces/readed-message.interface';
import { IRemoveMessage } from './interfaces/remove-message.interface';
import { IUpdateUser } from './interfaces/update-user.interface copy';
import { ITextTyping } from './interfaces/text-typing.interface';
import UsersSockets from 'src/utils/users-sockets.class';
//===========================================================================================================

@WebSocketGateway({
	cors: { origin: '*' },
	namespace: 'chat',
})
export class SocketGateway {
	constructor(
		private readonly messageService: MessageService,
		private readonly roomService: RoomService,
		private readonly userService: UserService,
	) { }

	@WebSocketServer() server: Server;

	/* Подключение пользователя */
	handleConnection(client: Socket) {
		const userId = client.handshake.auth.userId;
		const socketId = client.id;
		UsersSockets.setUser(userId, socketId)
		const users = UsersSockets.getAll();

		this.server.emit('SERVER:sockets-users', users);
	}

	/* Отключение пользователя */
	handleDisconnect(client: Socket) {
		const socketId = client.id;
		const userId = UsersSockets.getKeyByValue(socketId);
		if (userId) UsersSockets.deleteUser(Number(userId));
		const users = UsersSockets.getAll();

		this.server.emit('SERVER:sockets-users', users);
	}

	/* Создание первого сообщения и комнаты */
	@SubscribeMessage('CLIENT:create-first-message')
	async handleFirstMessagePost(
		@MessageBody() payload: ICreateFirstMessage,
	): Promise<void> {
		const partnerId = payload.partnerId;
		const userId = payload.userId;
		const room = await this.roomService.create({ partnerId }, userId);
		const roomId = room.id;

		const messageData = {
			text: payload.text.trim(),
			user: userId,
			room: roomId,
			status: false,
			imagesUrl: '',
			audioUrl: '',
		};

		const createdMessage = await this.messageService.createMessage(messageData);

		const detailedRoom = {
			id: room.id,
			createdAt: room.createdAt,
			user1: room.user1,
			user2: room.user2,
			messages: [
				{
					id: createdMessage.id,
					text: createdMessage.text,
					status: createdMessage.status,
					createdAt: createdMessage.createdAt,
					user: createdMessage.user,
					imagesUrl: createdMessage.imagesUrl,
					audioUrl: createdMessage.audioUrl,
				},
			],
		};

		const partnerSocketId = UsersSockets.getUser(partnerId);
		const userSocketId = UsersSockets.getUser(userId);

		this.server
			.to(partnerSocketId)
			.to(userSocketId)
			.emit('SERVER:create-room', detailedRoom);
	}

	/* Создание текстового сообщения */
	@SubscribeMessage('CLIENT:create-message')
	async handleMessagePost(
		@MessageBody() payload: ICreateMessage,
	): Promise<void> {
		const messageData = {
			text: payload.text.trim(),
			user: payload.userId,
			room: payload.roomId,
			status: false,
			imagesUrl: '',
			audioUrl: '',
		};

		const createdMessage = await this.messageService.createMessage(messageData);

		const partnerSocketId = UsersSockets.getUser(payload.partnerId);
		const userSocketId = UsersSockets.getUser(payload.userId);

		this.server
			.to(partnerSocketId)
			.to(userSocketId)
			.emit('SERVER:create-message', createdMessage);
	}

	/* Создание сообщения с прикрепленными файлами */
	@SubscribeMessage('CLIENT:create-file-message')
	async handleImagesMessage(
		@MessageBody() payload: ICreateFileMessage,
	): Promise<void> {
		const messageData = {
			text: '',
			user: payload.userId,
			room: payload.roomId,
			status: false,
			imagesUrl: payload.imagesUrl || '',
			audioUrl: payload.audioUrl || '',
		};

		const createdMessage = await this.messageService.createMessage(messageData);

		const partnerSocketId = UsersSockets.getUser(payload.partnerId);
		const userSocketId = UsersSockets.getUser(payload.userId);

		this.server
			.to(partnerSocketId)
			.to(userSocketId)
			.emit('SERVER:create-message', createdMessage);
	}

	/* Изменение статуса сообщения на "прочитано" */
	@SubscribeMessage('CLIENT:readed-message')
	async handleReadedMessage(
		@MessageBody() payload: IReadedMessage,
	): Promise<void> {
		const isUpdate = await this.messageService.updateStatusMessage(payload.id);
		if (isUpdate.affected !== 1)
			throw new WsException('Ошибка при изменении статуса сообщения');

		const room = await this.roomService.findOne(payload.roomId);
		if (!room) throw new WsException('Ошибка при изменении статуса сообщения');

		const partnerSocketId = UsersSockets.getUser(room.user1.id);
		const userSocketId = UsersSockets.getUser(room.user2.id);

		this.server
			.to(partnerSocketId)
			.to(userSocketId)
			.emit('SERVER:readed-message', payload);
	}

	/* Удаление сообщения */
	@SubscribeMessage('CLIENT:remove-message')
	async handleRemoveMessage(
		@MessageBody() payload: IRemoveMessage,
	): Promise<void> {
		await this.messageService.remove(payload.id);

		const room = await this.roomService.findOne(payload.roomId);
		if (!room) throw new WsException('Ошибка при изменении статуса сообщения');

		const partnerSocketId = UsersSockets.getUser(room.user1.id);
		const userSocketId = UsersSockets.getUser(room.user2.id);

		this.server
			.to(partnerSocketId)
			.to(userSocketId)
			.emit('SERVER:remove-message', payload);
	}

	/* Обновление данных пользователя */
	@SubscribeMessage('CLIENT:update-user')
	async handleUpdateUserData(
		@MessageBody() payload: IUpdateUser,
	): Promise<void> {
		const userId = payload.userId;
		const newUserData = payload.newData;

		const isUpdate = await this.userService.update(userId, newUserData);
		if (isUpdate.affected !== 1)
			throw new WsException('Ошибка при изменении статуса сообщения');

		const userSocketId = UsersSockets.getUser(userId);

		this.server.to(userSocketId).emit('SERVER:update-user', payload.newData);
	}

	/* Получение статуса, что пользователь печатает сообщение */
	@SubscribeMessage('CLIENT:text-typing')
	async handleTextTyping(@MessageBody() payload: ITextTyping): Promise<void> {
		const partnerId = payload.partnerId;

		const partnerSocketId = UsersSockets.getUser(partnerId);

		this.server.to(partnerSocketId).emit('SERVER:text-typing', payload.userId);
	}
}
