export interface IMessage {
	id: number;
	text: string;
	imagesUrl: string;
	audioUrl: string;
	status: boolean;
	createdAt: Date;
	user: number;
}
