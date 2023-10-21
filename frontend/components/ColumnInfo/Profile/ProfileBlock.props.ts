import { ColumnInfoType } from "../ColumnInfo.types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
//=========================================================================================================================

export interface ProfileBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	userId: number;
	username: string;
	email: string;
	status: string;
	avatarUrl: string;
	setTypeInfoColumn: (value: ColumnInfoType) => void;
}
