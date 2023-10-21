import { ISocketUser } from "@/interfaces/socket.interface";
//===========================================================================================================

export const checkOnlineUser = (arraySockets: ISocketUser, partnerId: number): boolean => {
	const check = Object.keys(arraySockets);
	if (check.includes(partnerId.toString())) {
		return true
	} else {
		return false;
	}
}