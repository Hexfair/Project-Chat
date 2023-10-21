export interface INewUserData {
	username: string;
	status: string;
	avatarUrl: string;
}

export interface IUpdateUser {
	userId: number;
	newData: INewUserData;
}
