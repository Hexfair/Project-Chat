import React from "react";
import styles from './ElemSpinner.module.scss';
//=========================================================================================================================

export default function ElemSpinner(): JSX.Element {
	return (

		<svg className={styles.spinner} viewBox="0 0 50 50">
			<circle className={styles.path} cx="25" cy="25" r="18" fill="none" strokeWidth="5" />
		</svg >
	);
}