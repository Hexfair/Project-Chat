import * as bcrypt from 'bcrypt';
//===========================================================================================================

export const HashingPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};
