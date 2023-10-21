import { Injectable } from '@nestjs/common';
import { GetMoreMessagesDto } from './dto/getmore-messages.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMessage } from './interfaces/message.interface';
//=========================================================================================================================

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private readonly messageRepository: Repository<Message>,
	) {}

	/* Сохранение сообщения в базу */
	async createMessage(data: any) {
		return await this.messageRepository.save(data);
	}

	/* Получение всех сообщений конкретного диалога */
	async findByRoomId(roomId: number) {
		const messages = await this.messageRepository.find({
			relations: {
				user: true,
			},
			where: {
				room: {
					id: roomId,
				},
			},
			order: {
				createdAt: 'DESC', // "DESC" | "ASC"
			},
			take: 3,
		});
		return messages;
	}

	/* Обновление статуса сообщения (на "прочитано") */
	async updateStatusMessage(messageId: number) {
		return await this.messageRepository.update(messageId, { status: true });
	}

	/* Удаление сообщения */
	async remove(id: number) {
		return await this.messageRepository.delete(id);
	}

	/* Получение части сообщений - пагинация */
	async getMoreMessages(getMoreMessagesDto: GetMoreMessagesDto) {
		const countMessages = 50;

		const messages = await this.messageRepository.find({
			relations: {
				user: true,
			},
			where: {
				room: {
					id: getMoreMessagesDto.roomId,
				},
			},
			order: {
				createdAt: 'DESC',
			},
			take: countMessages,
			skip: (getMoreMessagesDto.page - 1) * countMessages,
		});

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

		return sortMessages;
	}
}
