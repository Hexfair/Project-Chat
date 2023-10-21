import { ColumnInfoType } from "../ColumnInfo.types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
//=========================================================================================================================

export interface SearchBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setTypeInfoColumn: (value: ColumnInfoType) => void;
}
