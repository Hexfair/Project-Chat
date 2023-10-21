import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
//=========================================================================================================================

export interface ElemButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
}
