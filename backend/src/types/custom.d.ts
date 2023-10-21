import { IUserAuth } from 'src/auth/interfaces/user-auth.interface';
//===========================================================================================================

declare module 'express' {
	export interface Request {
		user: IUserAuth;
	}
}
