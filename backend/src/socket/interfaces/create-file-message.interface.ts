export interface ICreateFileMessage {
	userId: number;
	partnerId: number;
	roomId: number;
	imagesUrl?: string;
	audioUrl?: string;
}
