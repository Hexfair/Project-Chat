import * as bcrypt from 'bcrypt';
//===========================================================================================================

export const ValidationPassword = async (
	password: string,
	passwordHash: string,
): Promise<boolean> => {
	const match = await bcrypt.compare(password, passwordHash);
	return match;
};
