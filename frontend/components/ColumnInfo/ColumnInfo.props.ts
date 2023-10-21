import { ColumnInfoType } from "./ColumnInfo.types";
import { ISocketUser } from "@/interfaces/socket.interface";
//=========================================================================================================================

export interface ColumnInfoProps {
	typeInfoColumn: ColumnInfoType;
	setTypeInfoColumn: (value: ColumnInfoType) => void;
	socketsUsers: ISocketUser;
}
