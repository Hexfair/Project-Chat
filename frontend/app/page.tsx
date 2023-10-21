import React from 'react';
import styles from './page.module.scss';
import ElemButtonStart from '@/components/ElemButtonStart/ElemButtonStart';
//===========================================================================================================

function Home() {
	return (
		<main className={styles.page}>
			<div>
				<span data-text='Hexfair...'>Hexfair...</span>
				<span data-text='CHAT'>CHAT</span>
			</div>
			<div className={`${styles.star} ${styles.star1}`}></div>
			<div className={`${styles.star} ${styles.star2}`}></div>
			<div className={`${styles.star} ${styles.star3}`}></div>
			<div className={`${styles.star} ${styles.star4}`}></div>
			<div className={`${styles.star} ${styles.star5}`}></div>
			<div className={`${styles.star} ${styles.star6}`}></div>
			<div className={`${styles.star} ${styles.star7}`}></div>
			<div className={`${styles.star} ${styles.star8}`}></div>
			<div>
				<ElemButtonStart />
			</div>
		</main>
	);
}

export default Home;