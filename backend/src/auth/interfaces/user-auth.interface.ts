export interface IUserAuth {
	id: number;
	email: string;
	username: string;
	status: string;
	avatarUrl: string;
	code: number;
}

export type IReqUser = IUserAuth;
