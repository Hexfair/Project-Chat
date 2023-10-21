import React from 'react';
import styles from './ColumnNavbar.module.scss';
import { Tooltip } from 'antd';
import { ColumnNavbarProps } from './ColumnNavbar.props';
import { navMenuItems } from './ColumnNavbar.constants';
import ElemAvatarImage from '../ElemAvatarImage/ElemAvatarImage';
//=========================================================================================================================

export default function ColumnNavbar(props: ColumnNavbarProps): React.JSX.Element {
	const { avatarUrl, typeInfoColumn, onChangeTypeInfoColumn, id, username, isVisible } = props;

	return (
		<div className={`${styles.navbarColumn} ${!isVisible && styles.noVisible}`}>
			<div className={`${styles.userAvatar} ${avatarUrl && styles.withAvatar}`}>
				{<ElemAvatarImage
					avatarUrl={avatarUrl}
					alt='User avatar'
					id={id}
					username={username}
				/>}
			</div>
			<ul>
				{navMenuItems.map((obj) =>
					<Tooltip key={obj.title} placement="right" title={obj.tooltip}>
						<li
							className={`${styles.navButton} ${typeInfoColumn === obj.title ? styles.active : ''}`}
							onClick={() => onChangeTypeInfoColumn(obj.title)}
						>{obj.icon}
						</li>
					</Tooltip>)}
			</ul>
		</div>
	);
}


