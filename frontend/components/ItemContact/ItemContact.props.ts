import { IPartner } from "@/interfaces/partner.interface";
import { ColumnInfoType } from "../ColumnInfo/ColumnInfo.types";
//=========================================================================================================================

export interface ItemContactProps extends IPartner {
	countUnreadMessages: number;
	isOnline: boolean;
	typingUserId?: number;
	isSearchBlock: boolean;
	roomId?: number;
	setTypeInfoColumn: (value: ColumnInfoType) => void;
}