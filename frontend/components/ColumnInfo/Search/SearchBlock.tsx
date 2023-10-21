import React, { Fragment } from 'react';
import styles from './SearchBlock.module.scss';
import Search from 'antd/es/input/Search';
import axios from '@/configs/axios';
import { SearchUserType } from '@/interfaces/user.interface';
import ItemContact from '@/components/ItemContact/ItemContact';
import { SearchBlockProps } from './SearchBlock.props';
//=========================================================================================================================

export default function SearchBlock(props: SearchBlockProps): React.JSX.Element {
	const { className, setTypeInfoColumn } = props;
	const [isDisabledButton, setIsDisabledButton] = React.useState<boolean>(false);
	const [searchedUsers, setSearchedUsers] = React.useState<SearchUserType[]>();

	const onSearch = async (value: string) => {
		try {
			if (value.length === 0) {
				return setSearchedUsers([]);
			}
			setIsDisabledButton(true);
			const { data } = await axios.post<SearchUserType[]>('/room/search', { searchValue: value });

			setSearchedUsers(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsDisabledButton(false);
		}
	};

	return (
		<div className={`${styles.container} ${className}`}>
			<h3 className={styles.title}>Поиск пользователя</h3>
			<div className={styles.search}>
				<Search
					placeholder='Поиск пользователя'
					loading={isDisabledButton}
					onSearch={onSearch}
					allowClear
				/>
			</div>

			{searchedUsers && searchedUsers.map(obj =>
				<Fragment key={obj.id}>
					<ItemContact
						isSearchBlock={true}
						id={obj.id}
						username={obj.username}
						status={obj.status}
						isOnline={false}
						avatarUrl={obj.avatarUrl}
						countUnreadMessages={0}
						setTypeInfoColumn={setTypeInfoColumn}
					/>
				</Fragment>)}
		</div>
	);
}