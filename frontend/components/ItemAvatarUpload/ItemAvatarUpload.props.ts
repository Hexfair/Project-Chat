export interface ItemAvatarUploadProps {
	imageValue: File | undefined;
	removeImage: () => void;
	handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
