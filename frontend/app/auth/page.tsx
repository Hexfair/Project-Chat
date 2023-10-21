import React from 'react';
import styles from './page.module.scss';
import BlockAuthForm from '@/components/BlockAuthForm/BlockAuthForm';
//===========================================================================================================

function Auth() {
	return (
		<div className={styles.page}>
			<div className={styles.leftSide}>
			</div>
			<div className={styles.rightSide}>
				<BlockAuthForm />
			</div>
		</div>
	);
}

export default Auth;
