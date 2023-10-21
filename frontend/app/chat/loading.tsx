'use client'
import { Spin } from 'antd';
import styles from './page.module.scss';
//===========================================================================================================

export default function Loading() {
	return (
		<div className={styles.spin}>
			<Spin size='large' />
		</div>
	)
}