import React from 'react';
import styles from './ColumnDialog.module.scss';
import { LeftOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import socket from '@/configs/socket';
import { removeOneMessage, updateDataMessages, updateReadedMessage } from '@/redux/slices/contacts.slice';
import { setInitialPartnerState } from '@/redux/slices/partner.slice';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import BlockMessages from '../BlockMessages/BlockMessages';
import ElemTextarea from '../ElemTextarea/ElemTextarea';
import ItemSendAudio from '../ItemSendAudio/ItemSendAudio';
import ItemSendImages from '@/components/ItemSendImages/ItemSendImages';
import ElemButton from '../ElemButton/ElemButtonIcon';
import BlockEmptyDialog from '../BlockEmptyDialog/BlockEmptyDialog';
import { contactsDataSelector } from '@/redux/selectors/contacts.selector';
import { partnerSelector } from '@/redux/selectors/partner.selector';
import { ColumnDialogProps } from './ColumnDialog.props';
import { IMessage, IRemoveMessage, IUpdateMessage, IUpdateStatusMessage } from '@/interfaces/message.interface';
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index';
import { IContact } from '@/interfaces/contact.interface';
import ElemAvatarImage from '../ElemAvatarImage/ElemAvatarImage';
//=========================================================================================================================
export default function ColumnDialog(props: ColumnDialogProps): React.JSX.Element {
	const { userId, userName, userAvatarUrl, typeInfoColumn } = props;

	const dispatch = useAppDispatch();
	const partnerData = useAppSelector(partnerSelector);
	const contactsData = useAppSelector(contactsDataSelector);

	const [textMessage, setTextMessage] = React.useState<string>('');
	const [lastMessageId, setLastMessageId] = React.useState<number>(0);
	const [isTyping, setIsTyping] = React.useState<boolean>(true);
	const [messages, setMessages] = React.useState<IMessage[]>([]);
	const [isOpenEmojiPicker, setIsOpenEmojiPicker] = React.useState<boolean>(false);
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	const sendFirstMessage = () => {
		if (textMessage.length > 0) {
			setTextMessage('');
			socket.emit("CLIENT:create-first-message", { userId, partnerId: partnerData.id, text: textMessage });
			socket.emit("CLIENT:text-typing", { userId: 0, partnerId: partnerData.id });
		}
	};

	const sendMessage = () => {
		if (textMessage.length > 0) {
			socket.emit("CLIENT:create-message", { userId, partnerId: partnerData.id, roomId: partnerData.roomId, text: textMessage });
			setTextMessage('');
			textareaRef.current?.focus();
		}
		setIsTyping(true);
		socket.emit("CLIENT:text-typing", { userId: 0, partnerId: partnerData.id });
	};

	const onKeyDownHandle = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (event.key === 'Enter') {
			event.preventDefault();
			sendMessage();
		}
	};

	const onChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextMessage(event.target.value);
		if (event.target.value !== '' && isTyping) {
			socket.emit("CLIENT:text-typing", { userId, partnerId: partnerData.id });
			setIsTyping(false);
		}
		if (event.target.value === '') {
			socket.emit("CLIENT:text-typing", { userId: 0, partnerId: partnerData.id });
			setIsTyping(true);
		}
	};

	const onBack = () => {
		dispatch(setInitialPartnerState());
	};

	React.useEffect(() => {
		// Получение онлайн сообщения
		const getMessage = (value: IUpdateMessage) => dispatch(updateDataMessages({ value, userId }));
		socket.on('SERVER:create-message', getMessage);

		// Обновление статуса сообщения (прочитано)
		const updateStatusMessage = (value: IUpdateStatusMessage) => dispatch(updateReadedMessage(value));
		socket.on('SERVER:readed-message', updateStatusMessage);

		// Удаление сообщения
		const removeMessage = (value: IRemoveMessage) => dispatch(removeOneMessage(value));
		socket.on('SERVER:remove-message', removeMessage);

		return () => {
			socket.off('SERVER:create-message', getMessage);
			socket.off('SERVER:readed-message', updateStatusMessage);
			socket.off('SERVER:remove-message', removeMessage);
		};
	}, [partnerData.roomId, dispatch, userId]);


	React.useEffect(() => {
		const contact = contactsData.filter((obj: IContact) => obj.id === partnerData.roomId);
		if (partnerData.roomId === 0) {
			setMessages([]);
		} else {
			if (contact.length > 0) {
				setMessages(contact[0].messages);
				contact[0].lastScrollMessageId && setLastMessageId(contact[0].lastScrollMessageId);
			}
		}
	}, [partnerData.roomId, contactsData]);

	const addEmoji = (emojiElement: BaseEmoji) => {
		const sym = emojiElement.unified.split('-');
		const codeArray: any[] = [];
		sym.forEach((el: string) => codeArray.push('0x' + el));
		const emoji = String.fromCodePoint(...codeArray);
		setTextMessage((prev) => prev + emoji);
	};


	if (!partnerData.id) {
		return <BlockEmptyDialog />;
	}

	return (
		<div className={styles.dialogColumn}>
			<div className={`${styles.header} ${partnerData.status && styles.withStatus}`}>
				<div className={styles.back} onClick={onBack}><LeftOutlined /></div>
				<div className={styles.partnerAvatar}>
					{<ElemAvatarImage
						avatarUrl={partnerData.avatarUrl}
						alt='Partner avatar'
						id={partnerData.id}
						username={partnerData.username}
					/>}
				</div>
				<div className={styles.partnerName}>{partnerData.username}</div>
				{partnerData.status && <div className={styles.partnerStatus}>{`< ${partnerData.status} >`}</div>}

			</div>
			<BlockMessages
				messages={messages}
				roomId={partnerData.roomId}
				userData={{ userId, userAvatarUrl, userName }}
				partnerData={{ partnerId: partnerData.id, partnerAvatarUrl: partnerData.avatarUrl, partnerName: partnerData.username }}
				lastMessageId={lastMessageId}
				isSearch={typeInfoColumn === 'search' ? true : false}
			/>
			<div className={styles.footer}>
				{typeInfoColumn !== 'search' &&
					<ItemSendAudio
						userId={userId}
						partnerId={partnerData.id}
						roomId={partnerData.roomId}
					/>}
				{typeInfoColumn !== 'search' &&
					<ItemSendImages
						roomId={partnerData.roomId}
						userId={userId}
						partnerId={partnerData.id}
					/>}
				<ElemTextarea
					textMessage={textMessage}
					onChangeTextarea={onChangeTextarea}
					textareaRef={textareaRef}
					onKeyDownHandle={onKeyDownHandle}
				/>
				<ElemButton
					className={styles.buttonSend}
					onClick={() => setIsOpenEmojiPicker(!isOpenEmojiPicker)}	>
					<SmileOutlined />
				</ElemButton>
				<ElemButton
					className={styles.buttonSend}
					onClick={partnerData.isSearch ? sendFirstMessage : sendMessage}>
					<SendOutlined />
				</ElemButton>
			</div>
			{isOpenEmojiPicker &&
				<Picker
					className={styles.picker}
					data={data}
					previewPosition='none'
					locale='ru'
					onClickOutside={() => setIsOpenEmojiPicker(false)}
					onEmojiSelect={addEmoji}
				/>}
		</div>
	);
}


