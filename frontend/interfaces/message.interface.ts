export interface IMessage {
	id: number,
	text: string,
	imagesUrl: string,
	audioUrl: string,
	status: boolean,
	createdAt: string,
	user: number
}

export interface IUpdateMessage extends IMessage {
	room: number,
}

export interface IUpdateStatusMessage {
	id: number;
	roomId: number
}

export interface IRemoveMessage extends IUpdateStatusMessage { }
