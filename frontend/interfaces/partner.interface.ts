import { IMessage } from "./message.interface"
import { IUser } from "./user.interface"
//===========================================================================================================

export interface ILastMessage {
	text: string;
	createdAt: string;
}

export interface IPartner {
	id: number;
	username: string;
	status: string;
	isSearch?: boolean;
	avatarUrl: string;
	lastMessage?: ILastMessage;
}