import { LegacyRef } from "react";
//===========================================================================================================

export interface ElemTextareaProps {
	textMessage: string;
	onChangeTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	textareaRef: LegacyRef<HTMLTextAreaElement>;
	onKeyDownHandle: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
