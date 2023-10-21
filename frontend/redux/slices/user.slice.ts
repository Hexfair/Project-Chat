import axios from '@/configs/axios';
import { ChangeUserDataType, IUser } from '@/interfaces/user.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setCookie } from 'nookies';
//===========================================================================================================

const initialState: IUser = {
	id: 0,
	email: '',
	username: '',
	status: '',
	avatarUrl: ''
}

const userSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<IUser>) => {
			state.id = action.payload?.id;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.status = action.payload?.status;
			state.avatarUrl = action.payload?.avatarUrl;
			if (action.payload.token) {
				setCookie(null, 'chat-token', action.payload.token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
				axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
			}
		},
		updateUser: (state, action: PayloadAction<ChangeUserDataType>) => {
			state.username = action.payload.username;
			state.status = action.payload.status;
			state.avatarUrl = action.payload.avatarUrl;
		},
		setInitialUserState: (state) => {
			state.id = 0;
			state.email = '';
			state.username = '';
			state.status = '';
			state.avatarUrl = '';
		},
	}
})

export const { setUserData, updateUser, setInitialUserState } = userSlice.actions;
export default userSlice.reducer;