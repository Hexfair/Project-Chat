import React from 'react';
import Image from 'next/image';
import styles from './BlockEmptyDialog.module.scss';
//=========================================================================================================================

export default function BlockEmptyDialog(): React.JSX.Element {

	return (
		<div className={`${styles.dialogColumn} ${styles.empty}`}>
			<p className={styles.emptyText}>Для начала общения выберите диалог в списке контактов</p>
			<Image
				src='/icons/empty.png'
				width={200}
				height={200}
				alt='Picture of the author'
				priority
			/>
		</div>
	);
}