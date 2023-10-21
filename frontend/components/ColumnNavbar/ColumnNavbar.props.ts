import { ColumnInfoType } from "../ColumnInfo/ColumnInfo.types";
//=========================================================================================================================

export interface ColumnNavbarProps {
	id: number;
	username: string;
	avatarUrl: string;
	typeInfoColumn: ColumnInfoType;
	onChangeTypeInfoColumn: (value: ColumnInfoType) => void;
	setIsVisible: (value: boolean) => void;
	isVisible: boolean;
}
