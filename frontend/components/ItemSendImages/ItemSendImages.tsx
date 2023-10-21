import React from 'react';
import styles from './ItemSendImages.module.scss';
import { Modal } from 'antd';
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons';
import socket from '@/configs/socket';
import axios from '@/configs/axios';
import { ItemSendImagesProps } from './ItemSendImages.props';
import { IFile } from '@/interfaces/file.interface';
import ElemButton from '../ElemButton/ElemButtonIcon';
//=========================================================================================================================

export default function ItemSendImages(props: ItemSendImagesProps): React.JSX.Element {
	const { roomId, userId, partnerId } = props;

	const inputImagesRef = React.useRef<HTMLInputElement>(null);
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	const [imagesValue, setImagesValue] = React.useState<File[]>();

	const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImagesValue(Object.values(event.target.files));
			setIsModalOpen(true);
		}
	};

	const onRemoveImage = (imageName: string) => {
		const filterImages = imagesValue?.filter((obj: File) => obj.name !== imageName);
		setImagesValue(filterImages);
	};

	const handleModalOk = async () => {
		try {
			const imagesUrlArray: IFile[] = [];
			if (imagesValue) {
				for (const image of imagesValue) {
					const formData = new FormData();
					formData.append('file', image);
					const { data } = await axios.post<IFile[]>('/files/upload', formData);
					if (data[0].url) imagesUrlArray.push(data[0]);
				}
			}

			const stringUrl = JSON.stringify(imagesUrlArray);

			socket.emit("CLIENT:create-file-message", { userId, partnerId, roomId, imagesUrl: stringUrl });
		} catch (error) {
			console.log(error);
		} finally {
			setIsModalOpen(false);
		}
	};

	const handleModalCancel = () => {
		setImagesValue(undefined);
		setIsModalOpen(false);
	};


	return (
		<>
			<ElemButton
				className={styles.buttonImage}
				onClick={() => inputImagesRef.current?.click()}>
				<FileImageOutlined />
			</ElemButton>
			<input type='file' ref={inputImagesRef} onChange={handleChangeFiles} hidden multiple />
			<Modal
				className={styles.modal}
				title='Загрузка изображений'
				open={isModalOpen}
				onOk={handleModalOk}
				okText='Отправить'
				onCancel={handleModalCancel}
				cancelText='Отмена'
				okButtonProps={{ className: styles.okButton }}
			>
				<div className={styles.imagesBox}>
					{imagesValue && imagesValue.map((obj: File) =>
						<span key={obj.name} className={styles.image}>
							<img src={URL.createObjectURL(obj)} alt='Preview' />
							<span className={styles.remove} onClick={() => onRemoveImage(obj.name)}><DeleteFilled /></span>
						</span>
					)}
				</div>
			</Modal>
		</>
	);
}