import { MessageOutlined, UserAddOutlined } from '@ant-design/icons';
import ProfileIcon from '@/public/icons/profile.svg';
import { ColumnInfoType } from "../ColumnInfo/ColumnInfo.types";
//===========================================================================================================

export interface MenuItem {
	title: ColumnInfoType;
	icon: React.ReactNode;
	tooltip: string;
}

export const navMenuItems: MenuItem[] = [
	{
		title: 'profile',
		icon: <ProfileIcon />,
		tooltip: 'Профиль'
	},
	{
		title: 'dialogs',
		icon: <MessageOutlined />,
		tooltip: 'Диалоги'
	},
	{
		title: 'search',
		icon: <UserAddOutlined />,
		tooltip: 'Поиск'
	},
];