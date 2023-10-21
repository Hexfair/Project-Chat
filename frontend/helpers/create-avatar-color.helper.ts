import variables from '@/app/variables.module.scss';

export const createAvatarColor = (id: number,) => {
	switch (id % 10) {
		case 0: return variables.avatarColor0;
		case 1: return variables.avatarColor1;
		case 2: return variables.avatarColor2;
		case 3: return variables.avatarColor3;
		case 4: return variables.avatarColor4;
		case 5: return variables.avatarColor5;
		case 6: return variables.avatarColor6;
		case 7: return variables.avatarColor7;
		case 8: return variables.avatarColor8;
		case 9: return variables.avatarColor9;
		default:
			return variables.avatarColor0;
	}
}