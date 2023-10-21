import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import partnerSlice from "./slices/partner.slice";
import contactsSlice from "./slices/contacts.slice";
//===========================================================================================================

export const store = configureStore({
	reducer: {
		user: userSlice,
		partner: partnerSlice,
		contacts: contactsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;