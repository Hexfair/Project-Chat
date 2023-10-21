import { ICreateFirstMessage } from './create-first-message.interface';

export interface ICreateMessage extends ICreateFirstMessage {
	roomId: number;
}
