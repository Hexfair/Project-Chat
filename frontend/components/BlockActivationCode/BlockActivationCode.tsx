import React from 'react';
import styles from './BlockActivationCode.module.scss';
import axios from '@/configs/axios';
import { IUser } from '@/interfaces/user.interface';
import { useAppDispatch } from '@/redux/hooks';
import { setUserData } from '@/redux/slices/user.slice';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { BlockActivationCodeProps } from './BlockActivationCode.props';
//=========================================================================================================================

export default function BlockActivationCode(props: BlockActivationCodeProps): React.JSX.Element {
	const { email } = props;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [codes, setCodes] = React.useState<string[]>([]);
	const boxRef = React.useRef<HTMLDivElement>(null);
	const [messageApi, contextHolder] = message.useMessage();

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const id: number = Number(event.target.getAttribute('id')) - 1;
		setCodes((prev) => {
			const newArr = [...prev];
			newArr[id] = event.target.value;
			return newArr;
		});
		const nextElement = event.target.nextElementSibling as HTMLInputElement;
		nextElement && nextElement?.focus();
	};

	const onActivate = async () => {
		try {
			const code = codes.join('');
			const response = await axios.post<IUser>('/auth/activate', { email, code });
			response.data && dispatch(setUserData(response.data));
			messageApi.open({
				type: 'success',
				content: 'Вы успешно активировали аккаунт!',
			});
			localStorage.removeItem('chat-user-activation');
			router.push('/chat');
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Ошибка активации. Проверьте правильность введенного кода',
			});
		}
	};

	return (
		<>
			{contextHolder}
			<div ref={boxRef} className={styles.content}>
				<h3 className={styles.title}>Активация аккаунта</h3>
				<p className={styles.subTitle}>Введите код из сообщения на электронной почте</p>
				<input
					id='1'
					type='tel'
					placeholder='X'
					maxLength={1}
					onChange={handleChangeInput}
					className={styles.input}
				/>
				<input
					id='2'
					type='tel'
					placeholder='X'
					maxLength={1}
					onChange={handleChangeInput}
					className={styles.input}
				/>
				<input
					id='3'
					type='tel'
					placeholder='X'
					maxLength={1}
					onChange={handleChangeInput}
					className={styles.input}
				/>
				<input
					id='4'
					type='tel'
					placeholder='X'
					maxLength={1}
					onChange={handleChangeInput}
					className={styles.input}
				/>
				<input
					id='5'
					type='tel'
					placeholder='X'
					maxLength={1}
					onChange={handleChangeInput}
					className={styles.input}
				/>
				<p className={styles.note}><span className={styles.star}>*</span> Код действителен в течение 20 минут. По окончанию этого срока процедуру регистрации необходимо пройти повторно</p>
				<div>
					<Button
						type='primary'
						htmlType='submit'
						className={styles.button}
						onClick={onActivate}
						disabled={codes.length !== 5}
					>Активировать
					</Button>
				</div>
			</div >
		</>
	);
}