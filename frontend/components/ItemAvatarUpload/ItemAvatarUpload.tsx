import React from 'react';
import styles from './ItemAvatarUpload.module.scss';
import { DeleteFilled } from '@ant-design/icons';
import { ItemAvatarUploadProps } from './ItemAvatarUpload.props';
//=========================================================================================================================

export default function ItemAvatarUpload(props: ItemAvatarUploadProps): React.JSX.Element {
	const { imageValue, removeImage, handleChangeFile } = props;
	const inputFileRef = React.useRef<HTMLInputElement>(null);

	return (
		<div className={styles.imageBox}>
			{imageValue
				? <div className={styles.preview}>
					<div
						className={styles.image}
						style={{ backgroundImage: `url("${URL.createObjectURL(imageValue)}")` }}>
					</div>
					<div className={styles.remove} onClick={removeImage}><DeleteFilled /></div>
				</div>
				: <div className={styles.upload} onClick={() => inputFileRef.current?.click()}>
					<p>+</p>
					<p>Выбрать<br />аватар</p>
				</div>
			}
			<input type='file' onChange={handleChangeFile} ref={inputFileRef} hidden />
		</div>
	);
}