import { IMessage } from "@/interfaces/message.interface";
//=========================================================================================================================

export interface ItemMessageProps extends IMessage {
	userData: {
		userId: number;
		userAvatarUrl: string;
		userName: string;
	}
	partnerData: {
		partnerAvatarUrl: string;
		partnerId: number;
		partnerName: string;
	}
	roomId: number;
	lastMessageId: number;
}
