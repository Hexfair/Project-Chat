import React from 'react';
import styles from './ContactsBlock.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { getCountUnreadMessage } from '@/helpers/count-unread.helper';
import { getLastMessage } from '@/helpers/last-message.helper';
import { checkOnlineUser } from '@/helpers/check-online.helper';
import socket from '@/configs/socket';
import { contactsDataSelector } from '@/redux/selectors/contacts.selector';
import { IContact } from '@/interfaces/contact.interface';
import { ContactsBlockProps } from './ContactsBlock.props';
import ItemContact from '@/components/ItemContact/ItemContact';
//=========================================================================================================================

export default function ContactsBlock(props: ContactsBlockProps): React.JSX.Element {
	const { userId, userName, userStatus, userAvatarUrl, socketsUsers, className, setTypeInfoColumn } = props;
	const contactsData = useAppSelector(contactsDataSelector);
	const [typingUserId, setTypingUserId] = React.useState<number>(0);

	React.useEffect(() => {
		// Получение инф-ции, что контакт печатает сообщение
		function getTyping(userTypingId: number) {
			const partnerIsTyping = userTypingId;
			setTypingUserId(partnerIsTyping);
		}
		socket.on('SERVER:text-typing', getTyping);

		return () => {
			socket.off('SERVER:text-typing', getTyping);
		};
	}, []);

	return (
		<div className={`${styles.container} ${className}`}>
			<h3 className={styles.title}>Диалоги</h3>
			{contactsData && contactsData.map((obj: IContact) => {
				const partnerData = {
					partnerId: obj.user1.id === userId ? obj.user2.id : obj.user1.id,
					partnerName: obj.user1.username === userName ? obj.user2.username : obj.user1.username,
					partnerStatus: obj.user1.status === userStatus ? obj.user2.status : obj.user1.status,
					partnerAvatarUrl: obj.user1.avatarUrl === userAvatarUrl ? obj.user2.avatarUrl : obj.user1.avatarUrl,
				};
				return <ItemContact
					key={obj.id}
					id={partnerData.partnerId}
					username={partnerData.partnerName}
					status={partnerData.partnerStatus}
					avatarUrl={partnerData.partnerAvatarUrl}
					roomId={obj.id}
					isSearchBlock={false}
					countUnreadMessages={getCountUnreadMessage(partnerData.partnerId, obj.messages)}
					lastMessage={getLastMessage(partnerData.partnerId, obj.messages)}
					isOnline={checkOnlineUser(socketsUsers, partnerData.partnerId)}
					typingUserId={typingUserId}
					setTypeInfoColumn={setTypeInfoColumn}
				/>;
			})}
		</div >
	);
}