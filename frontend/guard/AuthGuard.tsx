'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { userSelector } from '@/redux/selectors/user.selector';
import axios from '@/configs/axios';
import { IUser } from '@/interfaces/user.interface';
import { setUserData } from '@/redux/slices/user.slice';
//===========================================================================================================

function AuthGuard<T>(Component: React.ComponentType<T>) {
	return (props: T) => {
		const dispatch = useAppDispatch();
		const router = useRouter();
		const cookies = parseCookies();
		const cookie = cookies['chat-token'];
		const { id } = useAppSelector(userSelector);

		const getMe = async () => {
			try {
				const { data } = await axios.get<IUser>('/auth/me', {
					headers: { 'Authorization': 'Bearer ' + cookie }
				});
				data.token = cookie;
				dispatch(setUserData(data));
			} catch (error) {
			}
		};

		React.useEffect(() => {
			if (!cookie) {
				router.push('/auth');
			}
			if (cookie && id === 0) {
				getMe();
			}
		}, []);

		return <Component {...props!} />
	};
}

export default AuthGuard;