'use client';
import React from "react";
import styles from './ElemButtonStart.module.scss';
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import axios from "@/configs/axios";
import { IUser } from "@/interfaces/user.interface";
import { useAppDispatch } from "@/redux/hooks";
import { setUserData } from "@/redux/slices/user.slice";
//=========================================================================================================================

export default function ElemButtonStart(): JSX.Element {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const cookies = parseCookies();
	const cookie = cookies['chat-token'];
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const getMe = async () => {
		try {
			const { data } = await axios.get<IUser>('/auth/me');
			dispatch(setUserData(data));
			router.push('/chat');
		} catch (error) {
			router.push('/chat');
			setIsLoading(false);
		}
	};

	const onStartChat = () => {
		setIsLoading(true);
		!cookie ? router.push('/auth') : getMe();
	};

	return (
		<button className={styles.button} onClick={onStartChat} disabled={isLoading}>
			{isLoading ? 'Загрузка...' : 'Подключиться'}
		</button>
	);
}