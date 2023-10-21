import variables from '@/app/variables.module.scss';

export const createAvatarName = (username: string) => {
	const arr = username.split(' ');
	return arr.length > 1
		? `${arr[0][0].toUpperCase()}` + `${arr[1][0].toUpperCase()}`
		: `${arr[0][0].toUpperCase()}` + `${arr[0][1].toUpperCase()}`
}