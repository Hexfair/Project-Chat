import { ISocketUser } from "@/interfaces/socket.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ColumnInfoType } from "../ColumnInfo.types";
//===========================================================================================================

export interface ContactsBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	userId: number;
	userName: string;
	userStatus: string;
	userAvatarUrl: string;
	socketsUsers: ISocketUser;
	setTypeInfoColumn: (value: ColumnInfoType) => void;
}
