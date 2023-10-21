import { IMessage } from "./message.interface"
import { IUser } from "./user.interface"
//===========================================================================================================

export interface IContact {
	id: number,
	createdAt: string,
	user1: IUser,
	user2: IUser,
	messages: IMessage[]
	lastScrollMessageId?: number
}