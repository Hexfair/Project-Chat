'use client';
import React from 'react';
import styles from './page.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import socket from '@/configs/socket';
import { parseCookies } from 'nookies';
import axios from '@/configs/axios';
import { createNewContact, setContactsData } from '@/redux/slices/contacts.slice';
import { Spin } from 'antd';
import { setInitialPartnerState } from '@/redux/slices/partner.slice';
import { userSelector } from '@/redux/selectors/user.selector';
import { ISocketUser } from '@/interfaces/socket.interface';
import ColumnDialog from '@/components/ColumnDialog/ColumnDialog';
import { ColumnInfoType } from '@/components/ColumnInfo/ColumnInfo.types';
import ColumnInfo from '@/components/ColumnInfo/ColumnInfo';
import ColumnNavbar from '@/components/ColumnNavbar/ColumnNavbar';
import { IContact } from '@/interfaces/contact.interface';
import AuthGuard from '@/guard/AuthGuard';
import { useMedia } from '@/hooks/use-media.hook';
import HideNavbarIcon from '@/public/icons/hide-navbar.svg';
import ShowNavbarIcon from '@/public/icons/show-navbar.svg';
//===========================================================================================================

function Chat(): React.JSX.Element {
	const cookies = parseCookies();
	const cookie = cookies['chat-token'];
	const dispatch = useAppDispatch();
	const { id, avatarUrl, username } = useAppSelector(userSelector);
	const [typeInfoColumn, setTypeInfoColumn] = React.useState<ColumnInfoType>('dialogs');
	const [socketsUsers, setSocketsUsers] = React.useState<ISocketUser>({});
	const [isVisible, setIsVisible] = React.useState<boolean>(true);
	const { isTablet } = useMedia();

	const onChangeTypeInfoColumn = (type: ColumnInfoType) => {
		if (isTablet && type === typeInfoColumn) {
			setTypeInfoColumn('');
		} else {
			setTypeInfoColumn(type);
			dispatch(setInitialPartnerState());
		}
	};

	React.useEffect(() => {
		if (id !== 0) {
			const userId = id;
			socket.auth = { userId };
			socket.connect();
		}

		return () => { socket.disconnect(); };
	}, [id]);

	React.useEffect(() => {
		const getUserContacts = async () => {
			const { data } = await axios.get<IContact[]>('/room/getAll', {
				headers: { Authorization: 'Bearer ' + cookie }
			});
			dispatch(setContactsData(data));
		};

		if (id !== 0 && cookie) getUserContacts();
	}, [id, cookie, dispatch]);

	React.useEffect(() => {
		//Создание нового диалога
		function getNewRoom(value: IContact) {
			dispatch(createNewContact(value));
			dispatch(setInitialPartnerState());
			setTypeInfoColumn('dialogs');
		}

		function getSocketsUsers(value: ISocketUser) {
			setSocketsUsers(value);
		}

		socket.on('SERVER:sockets-users', getSocketsUsers);
		socket.on('SERVER:create-room', getNewRoom);

		return () => {
			socket.off('SERVER:create-room', getNewRoom);
		};
	}, [dispatch]);


	if (!cookie || (cookie && id === 0)) {
		return (
			<div className={styles.spin}>
				<Spin size='large' />
			</div>
		);
	}

	return (
		<div className={`${styles.page} ${!isVisible && styles.noVisible}`}>
			<ColumnNavbar
				avatarUrl={avatarUrl}
				typeInfoColumn={typeInfoColumn}
				onChangeTypeInfoColumn={onChangeTypeInfoColumn}
				id={id}
				username={username}
				setIsVisible={setIsVisible}
				isVisible={isVisible}
			/>
			<span className={styles.button} onClick={() => setIsVisible(!isVisible)}>
				{isVisible ? <HideNavbarIcon /> : <ShowNavbarIcon />}

			</span>
			<ColumnInfo
				typeInfoColumn={typeInfoColumn}
				setTypeInfoColumn={setTypeInfoColumn}
				socketsUsers={socketsUsers}
			/>
			<ColumnDialog
				userId={id}
				userAvatarUrl={avatarUrl}
				userName={username}
				typeInfoColumn={typeInfoColumn}
			/>
		</div>
	);
}

export default AuthGuard(Chat);