import { IContact } from '@/interfaces/contact.interface';
import { IMessage, IRemoveMessage, IUpdateMessage, IUpdateStatusMessage } from '@/interfaces/message.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface ContactsData {
	contactsData: IContact[],
}

const initialState: ContactsData = {
	contactsData: [],
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setContactsData: (state, action: PayloadAction<IContact[]>) => {
			state.contactsData = action.payload;
		},
		updateDataMessages: (state, action: PayloadAction<{ value: IUpdateMessage, userId: number }>) => {
			const newMessage = {
				id: action.payload.value.id,
				text: action.payload.value.text,
				imagesUrl: action.payload.value.imagesUrl,
				audioUrl: action.payload.value.audioUrl,
				status: action.payload.value.status,
				createdAt: action.payload.value.createdAt,
				user: action.payload.value.user,
			}

			for (let i = 0; i <= state.contactsData.length - 1; i++) {
				if (state.contactsData[i].id === action.payload.value.room) {
					state.contactsData[i].messages.push(newMessage);
					if (action.payload.userId === newMessage.user) {
						state.contactsData[i].lastScrollMessageId = newMessage.id
					}
				}
			}
		},
		createNewContact: (state, action: PayloadAction<IContact>) => {
			state.contactsData.unshift(action.payload)
		},

		updateReadedMessage: (state, action: PayloadAction<IUpdateStatusMessage>) => {
			const updateState = state.contactsData.map((obj: IContact) => {
				if (obj.id === action.payload.roomId) {
					for (let i = 0; i <= obj.messages.length - 1; i++) {
						if (obj.messages[i].id === action.payload.id) {
							obj.messages[i].status = true
						}
					}
					return obj;
				} else {
					return obj;
				}
			})
			state.contactsData = updateState;
		},

		removeOneMessage: (state, action: PayloadAction<IRemoveMessage>) => {
			const updateState = state.contactsData.map((obj: IContact) => {
				if (obj.id === action.payload.roomId) {
					const index = obj.messages.findIndex((mes: IMessage) => mes.id === action.payload.id);
					if (index !== -1) {
						obj.messages.splice(index, 1);
					}
					return obj;
				} else {
					return obj;
				}
			})
			state.contactsData = updateState;
		},

		moreMessages: (state, action: PayloadAction<{ value: IUpdateMessage[], roomId: number }>) => {
			for (let i = 0; i <= state.contactsData.length - 1; i++) {
				if (state.contactsData[i].id === action.payload.roomId) {
					state.contactsData[i].messages.unshift(...action.payload.value)
				}
			}
		},
	}
})

export const { setContactsData, createNewContact, removeOneMessage, updateDataMessages, updateReadedMessage, moreMessages } = contactsSlice.actions;
export default contactsSlice.reducer;

