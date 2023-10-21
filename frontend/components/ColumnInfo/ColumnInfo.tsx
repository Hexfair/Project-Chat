import React from 'react';
import { ColumnInfoProps } from './ColumnInfo.props';
import ProfileBlock from './Profile/ProfileBlock';
import ContactsBlock from './Contacts/ContactsBlock';
import SearchBlock from './Search/SearchBlock';
import { useAppSelector } from '@/redux/hooks';
import { userSelector } from '@/redux/selectors/user.selector';
import styles from './ColumnInfo.module.scss';
import { useMedia } from '@/hooks/use-media.hook';
//=========================================================================================================================
export default function ColumnInfo(props: ColumnInfoProps): React.JSX.Element {
	const { typeInfoColumn, setTypeInfoColumn, socketsUsers } = props;
	const { id, username, email, status, avatarUrl } = useAppSelector(userSelector);
	const { isTablet } = useMedia();

	return (
		<div className={`${styles.column} ${isTablet && typeInfoColumn !== '' && styles.visible}`}>
			<ProfileBlock
				userId={id}
				username={username}
				email={email}
				status={status}
				avatarUrl={avatarUrl}
				setTypeInfoColumn={setTypeInfoColumn}
				className={typeInfoColumn === 'profile' ? styles.active : ''}
			/>
			<ContactsBlock
				userId={id}
				userName={username}
				userStatus={status}
				userAvatarUrl={avatarUrl}
				socketsUsers={socketsUsers}
				setTypeInfoColumn={setTypeInfoColumn}
				className={typeInfoColumn === 'dialogs' ? styles.active : ''}
			/>
			<SearchBlock
				className={typeInfoColumn === 'search' ? styles.active : ''}
				setTypeInfoColumn={setTypeInfoColumn}

			/>
			<div className={styles.board}></div>
		</div>
	);
}


