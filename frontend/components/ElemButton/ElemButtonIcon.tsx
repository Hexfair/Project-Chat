import React from "react";
import { ElemButtonProps } from "./ElemButton.props";
//=========================================================================================================================

export default function ElemButton({ children, ...props }: ElemButtonProps): JSX.Element {
	return (
		<button {...props}>{children}</button>
	);
}