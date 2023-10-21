'use client';
import React from 'react';
import styles from './ProfileBlock.module.scss';
import ItemAvatarUpload from '@/components/ItemAvatarUpload/ItemAvatarUpload';
import { Button, Form, Input, Popconfirm } from 'antd';
import { useAppDispatch } from '@/redux/hooks';
import socket from '@/configs/socket';
import axios from '@/configs/axios';
import FormData from 'form-data';
import { setInitialUserState, updateUser } from '@/redux/slices/user.slice';
import { ProfileBlockProps } from './ProfileBlock.props';
import { ChangeUserDataType } from '@/interfaces/user.interface';
import { IFile } from '@/interfaces/file.interface';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';
//=========================================================================================================================

export default function ProfileBlock(props: ProfileBlockProps): React.JSX.Element {
	const { userId, username, email, status, avatarUrl, setTypeInfoColumn, className } = props;
	const router = useRouter();
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const [imageValue, setImageValue] = React.useState<File>();

	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) setImageValue(event.target.files[0]);
	};

	const removeImage = () => {
		setImageValue(undefined);
	};

	const onSubmitForm = async (values: ChangeUserDataType) => {
		try {
			if (imageValue) {
				const formData = new FormData();
				formData.append('file', imageValue);
				const { data } = await axios.post<IFile[]>('/files/upload', formData);
				values.avatarUrl = data[0].url;
			}

			const newData = {
				username: values.username,
				status: values.status || '',
				avatarUrl: values.avatarUrl || avatarUrl || ''
			};

			socket.emit('CLIENT:update-user', { userId, newData });
		} catch (error) {
			console.log(error);
		}
	};

	const onLogout = () => {
		destroyCookie(null, 'chat-token', { path: '/' });
		dispatch(setInitialUserState());
		router.push('/auth');
	};

	React.useEffect(() => {
		// Обновление данных пользователя
		function updateUserData(value: ChangeUserDataType) {
			dispatch(updateUser(value));
			alert('Данные успешно сохранены');
			setTypeInfoColumn('dialogs');
		}

		socket.on('SERVER:update-user', updateUserData);

		return () => {
			socket.off('SERVER:update-user', updateUserData);
		};
	}, [dispatch]);

	return (
		<div className={`${styles.container} ${className}`}>
			<h3 className={styles.title}>Данные вашего аккаунта</h3>
			<p className={styles.email}>{email}</p>
			<ItemAvatarUpload
				imageValue={imageValue}
				removeImage={removeImage}
				handleChangeFile={handleChangeFile}
			/>
			<Form
				form={form}
				layout='vertical'
				initialValues={{ username, status }}
				onFinish={onSubmitForm}
				encType='multipart/form-data'
			>
				<Form.Item
					name='username'
					label='Имя'
					rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
				>
					<Input type='text' placeholder='Ваше имя' />
				</Form.Item>
				<Form.Item
					name='status'
					label='Статус'
				>
					<Input.TextArea placeholder='Статус' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>Сохранить</Button>
				</Form.Item>
			</Form>
			<Popconfirm
				title='Выход из аккаунта'
				description='Вы уверены что хотите выйти из аккаунта?'
				onConfirm={onLogout}
				okText='Да'
				cancelText='Нет'
			>
				<Button danger className={styles.button}>Выйти из аккаунта</Button>
			</Popconfirm>
		</div>
	);
}