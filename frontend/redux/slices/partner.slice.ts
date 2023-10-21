import { ILastMessage, IPartner } from '@/interfaces/partner.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

interface IPartnerSlice extends IPartner {
	roomId: number
}

const initialState: IPartnerSlice = {
	id: 0,
	username: '',
	status: '',
	roomId: 0,
	isSearch: false,
	lastMessage: {
		text: '',
		createdAt: '',
	},
	avatarUrl: ''
}

const partnerSlice = createSlice({
	name: 'partner',
	initialState,
	reducers: {
		setPartnerData: (state, action: PayloadAction<IPartnerSlice>) => {
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.status = action.payload.status;
			state.avatarUrl = action.payload.avatarUrl;
			state.roomId = action.payload.roomId;
			state.isSearch = action.payload.isSearch;
		},
		setLastMessage: (state, action: PayloadAction<ILastMessage>) => {
			state.lastMessage = action.payload;
		},
		setInitialPartnerState: (state) => {
			state.id = 0;
			state.username = '';
			state.status = '';
			state.roomId = 0;
			state.avatarUrl = '';
			state.isSearch = false;
			state.lastMessage = {
				text: '',
				createdAt: '',
			};
		},
	}
})

export const { setPartnerData, setLastMessage, setInitialPartnerState } = partnerSlice.actions;
export default partnerSlice.reducer;