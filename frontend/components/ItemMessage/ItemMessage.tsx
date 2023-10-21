'use client';
import React from 'react';
import styles from './ItemMessage.module.scss';
import { Button, Popconfirm } from 'antd';
import { Image as AntImage } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import socket from '@/configs/socket';
import NoConfirmIcon from '@/public/icons/noconfirm-message.svg';
import ConfirmIcon from '@/public/icons/confirm-message.svg';
import { useInView } from 'react-intersection-observer';
import { getDateOrTime } from '@/helpers/create-date.helper';
import { WaveSurferPlayer } from '../WaveSurferPlayer/WaveSurferPlayer';
import { ItemMessageProps } from './ItemMessage.props';
import ElemAvatarImage from '../ElemAvatarImage/ElemAvatarImage';
//=========================================================================================================================

export default function ItemMessage(props: ItemMessageProps): React.JSX.Element {
	const { id, createdAt, imagesUrl, audioUrl, status, user, text, userData, partnerData, roomId, lastMessageId } = props;

	const lastElemRef = React.useRef<HTMLDivElement>(null);

	const { ref, inView } = useInView({ threshold: 1.0, triggerOnce: true });

	const confirmRemoveMessage = () => {
		socket.emit("CLIENT:remove-message", { id, roomId });
	};

	const getAvatarUrl = () => {
		if (user === userData.userId) {
			return userData.userAvatarUrl ? userData.userAvatarUrl : '';
		} else {
			return partnerData.partnerAvatarUrl ? partnerData.partnerAvatarUrl : '';
		}
	};

	React.useEffect(() => {
		lastElemRef.current && lastElemRef.current.scrollIntoView({ block: "end", behavior: 'smooth' });
	}, []);

	React.useEffect(() => {
		if (user !== userData.userId && status === false && inView) {
			socket.emit("CLIENT:readed-message", { id, roomId });
		}
	}, [inView, ref]);

	return (
		<div className={styles.wrapper} ref={lastMessageId === id ? lastElemRef : null}>
			<div className={`${styles.topLine} ${user === userData.userId && styles.userMessage}`}>
				{text.length > 0 &&
					<p className={styles.contentText}>{text}</p>}
				{imagesUrl.length > 0 &&
					<div className={styles.contentImages}>{
						JSON.parse(imagesUrl).map((obj: { name: string; url: string }) =>
							<AntImage
								key={obj.name}
								className={styles.image}
								src={`http://localhost:4000/static/${obj.url}`}
							/>
						)}
					</div>}
				{audioUrl.length > 0 &&
					<div className={styles.contentAudio}>
						<WaveSurferPlayer
							height={40}
							waveColor='rgb(114, 105, 239)'
							progressColor='rgb(87, 76, 234)'
							url={`http://localhost:4000/static/${audioUrl}`}
						/>
					</div>}

				<div className={styles.confirmed}>
					{user === userData.userId && status === false && <NoConfirmIcon />}
					{user === userData.userId && status === true && <ConfirmIcon />}
				</div>
			</div>


			<div className={`${styles.options} ${user === userData.userId && styles.userMessage}`} ref={ref}>
				<span className={styles.avatar}>
					{<ElemAvatarImage
						avatarUrl={getAvatarUrl()}
						alt='Avatar'
						id={user === userData.userId ? userData.userId : partnerData.partnerId}
						username={user === userData.userId ? userData.userName : partnerData.partnerName}
						circle={true}
					/>}
				</span>
				<span className={styles.time}>{getDateOrTime(createdAt)}</span>
				{user === userData.userId && <span className={styles.dropdown}>
					<Popconfirm
						title='Вы хотите удалить сообщение?'
						onConfirm={confirmRemoveMessage}
						okText='Да'
						cancelText="Отмена"
						icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
					>
						<Button danger className={styles.button}><DeleteOutlined /></Button>
					</Popconfirm>
				</span>}
			</div>
		</div>
	);
}