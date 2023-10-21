import React from 'react';
import styles from './BlockMessages.module.scss';
import { Button } from 'antd';
import ItemMessage from '@/components/ItemMessage/ItemMessage';
import { BlockMessagesProps } from './BlockMessages.props';
import axios from '@/configs/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { contactsDataSelector } from '@/redux/selectors/contacts.selector';
import { moreMessages } from '@/redux/slices/contacts.slice';
import { IMessage, IUpdateMessage } from '@/interfaces/message.interface';
import { CloudDownloadOutlined } from '@ant-design/icons';
//=========================================================================================================================

export default function BlockMessages(props: BlockMessagesProps): React.JSX.Element {
	const { messages, userData, partnerData, roomId, lastMessageId, isSearch } = props;
	const dispatch = useAppDispatch();

	const bottomElemRef = React.useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = React.useState<boolean>(true);
	const contactsData = useAppSelector(contactsDataSelector);

	const getMoreMessages = async () => {
		try {
			const contacts = contactsData.filter(obj => obj.id === roomId);
			const { data } = await axios.post<IUpdateMessage[]>('/message/getMore', { roomId, page: (contacts[0].messages.length / 3) + 1 });

			if (data.length > 0) dispatch(moreMessages({ value: data, roomId }));
			if (data.length === 0) setIsVisible(false);
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		bottomElemRef.current && bottomElemRef.current.scrollIntoView({ block: "end" });
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.moreButton} >
				{isVisible && !isSearch && <Button type='primary' onClick={getMoreMessages}>Загрузить еще <CloudDownloadOutlined /></Button>}
			</div>
			{messages && messages.map((obj: IMessage) =>
				<ItemMessage
					key={obj.id}
					userData={userData}
					partnerData={partnerData}
					roomId={roomId}
					lastMessageId={lastMessageId}
					{...obj}
				/>
			)}
			<div className={styles.hiddenBlock} ref={bottomElemRef}></div>
		</div>
	);
}