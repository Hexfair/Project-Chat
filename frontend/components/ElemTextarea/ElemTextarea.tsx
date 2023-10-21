import React from 'react';
import styles from './ElemTextarea.module.scss';
import { ElemTextareaProps } from './ElemTextarea.props';
//=========================================================================================================================

export default function ElemTextarea(props: ElemTextareaProps): React.JSX.Element {
	const { textMessage, onChangeTextarea, textareaRef, onKeyDownHandle } = props;
	return (
		<textarea
			className={styles.textarea}
			placeholder='Текст сообщения...'
			value={textMessage}
			onChange={onChangeTextarea}
			ref={textareaRef}
			onKeyDown={onKeyDownHandle}
		/>
	);
}