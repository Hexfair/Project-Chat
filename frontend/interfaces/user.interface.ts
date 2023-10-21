export interface IUser {
	id: number;
	email: string;
	username: string,
	status: string;
	avatarUrl: string;
	token?: string;
}

export type SearchUserType = Pick<IUser, 'id' | 'status' | 'username' | 'avatarUrl'>

export type ChangeUserDataType = Pick<IUser, 'status' | 'username' | 'avatarUrl'>


// lastMessage: { text: string, createdAt: string };
// countUnreadMessages: number;
// isOnline: boolean;
// isTyping: number;