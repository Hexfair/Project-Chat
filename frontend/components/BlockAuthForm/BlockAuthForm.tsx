'use client';
import React from 'react';
import styles from './BlockAuthForm.module.scss';
import './Custom.antd.scss';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { IAuth } from '@/interfaces/auth.interface';
import { useRouter } from 'next/navigation';
import { setUserData } from '@/redux/slices/user.slice';
import { useAppDispatch } from '@/redux/hooks';
import axios from '@/configs/axios';
import { IUser } from '@/interfaces/user.interface';
import { isAxiosError } from 'axios';
import BlockActivationCode from '../BlockActivationCode/BlockActivationCode';
//=========================================================================================================================

export default function BlockAuthForm(): React.JSX.Element {
	const email = localStorage.getItem('chat-user-activation');
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [typeForm, setTypeForm] = React.useState<'login' | 'register' | 'activation'>(email ? 'activation' : 'login');
	const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
	const [messageApi, contextHolder] = message.useMessage();

	const onSubmitForm = async (values: IAuth) => {
		try {
			setIsDisabled(true);
			if (typeForm === 'register') {
				const response = await axios.post<IUser>('/auth/register', values);
				if (response.status === 201) {
					localStorage.setItem('chat-user-activation', values.email);
					setTypeForm('activation');
				}
			}

			if (typeForm === 'login') {
				const response = await axios.post<IUser>('/auth/login', values);
				response.data && dispatch(setUserData(response.data));
				messageApi.open({
					type: 'success',
					content: 'Вы успешно авторизовались!',
				});
				router.push('/chat');
			}
		} catch (error) {
			if (isAxiosError(error)) {
				messageApi.open({
					type: 'error',
					content: `${error.response?.data.message}`,
				});
			} else {
				messageApi.open({
					type: 'error',
					content: `Произошла ошибка в процессе авторизации. Попробуйте повторить запрос снова`,
				});
			}
			setIsDisabled(false);
		}
	};

	return (
		<>
			{contextHolder}
			{typeForm !== 'activation' &&
				< Form
					name='auth_form'
					className={styles.form}
					initialValues={{ remember: true }}
					layout='vertical'
					onFinish={onSubmitForm}
				>
					<h3 className={styles.title}>{typeForm === 'register' ? 'Регистрация аккаунта' : 'Войти в систему'}</h3>
					<p className={styles.subTitle}>{typeForm === 'register' ? 'Перед началом работы пройдите регистрацию' : 'Введите свои учетные данные'}</p>

					{typeForm === 'register' &&
						<Form.Item
							name='username'
							label='Имя'
							rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
						>
							<Input
								prefix={<UserOutlined />}
								type='text'
								placeholder='Username'
							/>
						</Form.Item>}
					<Form.Item
						name='email'
						label='Адрес электронной почты'
						rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
					>
						<Input
							prefix={<MailOutlined />}
							type='email'
							placeholder='Email'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						label='Пароль'
						rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
					>
						<Input
							prefix={<LockOutlined />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' disabled={isDisabled} className='login-form-button'>
							{typeForm === 'register' ? 'Зарегистрироваться' : 'Войти в аккаунт'}
						</Button>
						<br className={styles.divider} />
						или
						<a className={styles.button} onClick={() => typeForm === 'register' ? setTypeForm('login') : setTypeForm('register')}>
							{typeForm === 'register' ? 'Войти в аккаунт!' : 'Зарегистрироваться'}
						</a>
					</Form.Item>
				</Form >}
			{typeForm === 'activation' && email && <BlockActivationCode email={email} />}
		</>
	);
}