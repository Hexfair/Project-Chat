import React from 'react';
import styles from './ItemContact.module.scss';
import { setPartnerData } from '@/redux/slices/partner.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import TypingIcon from '@/public/icons/typing.svg';
import { getDateOrTime } from '@/helpers/create-date.helper';
import { ItemContactProps } from './ItemContact.props';
import ElemAvatarImage from '../ElemAvatarImage/ElemAvatarImage';
import { useMedia } from '@/hooks/use-media.hook';
//=========================================================================================================================

export default function ItemContact(props: ItemContactProps): React.JSX.Element {
	const { isSearchBlock, username, avatarUrl, id, status, roomId, countUnreadMessages, lastMessage, isOnline, typingUserId, setTypeInfoColumn } = props;

	const dispatch = useAppDispatch();
	const { id: partnerId } = useAppSelector((state: RootState) => state.partner);
	const { isTablet } = useMedia();

	const onOpenDialog = async () => {
		const room = isSearchBlock ? 0 : roomId;
		dispatch(setPartnerData({ id, username, status, isSearch: isSearchBlock, roomId: room || 0, avatarUrl, lastMessage }));
		if (isTablet) setTypeInfoColumn('');
	};

	return (
		<div className={`${styles.item} ${isSearchBlock && styles.find} ${id === partnerId && styles.selected}`} onClick={onOpenDialog}>
			<div className={styles.partnerAvatar}>
				{<ElemAvatarImage
					avatarUrl={avatarUrl}
					alt='Partner avatar'
					id={id}
					username={username}
				/>}
				{isOnline && <div className={styles.online}></div>}
			</div>
			<div className={styles.partnerName}>{username}</div>
			<div className={styles.lastMessage}>
				{isSearchBlock && <span className={styles.typing}>{status}</span>}
				{!isSearchBlock && id === typingUserId ? <span className={styles.typing}>печатает... <TypingIcon /></span> : lastMessage && lastMessage.text}
			</div>

			{!isSearchBlock &&
				<>
					<div className={styles.lastMessageTime}>{lastMessage && getDateOrTime(lastMessage.createdAt)}</div>
					{countUnreadMessages > 0 &&
						<div className={styles.countMessages}>
							{countUnreadMessages}
						</div>}
				</>}
		</div>
	);
}