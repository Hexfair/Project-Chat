import React from "react";
import styles from './ElemAvatarImage.module.scss';
import { ElemAvatarImageProps } from "./ElemAvatarImage.props";
import Image from 'next/image';
import { createAvatarColor } from "@/helpers/create-avatar-color.helper";
import { createAvatarName } from "@/helpers/create-avatar-name.helper";
import { useMedia } from "@/hooks/use-media.hook";

//=========================================================================================================================

export default function ElemAvatarImage(props: ElemAvatarImageProps): JSX.Element {
	const { avatarUrl, alt, id, username, circle } = props;
	const { isMobile } = useMedia();

	return (
		<>
			{avatarUrl.length !== 0
				? <Image
					src={`http://localhost:4000/static/${avatarUrl}`}
					alt={alt}
					width={isMobile ? 35 : 40}
					height={isMobile ? 35 : 40}
				/>
				: <div
					className={`${styles.colorAvatar} ${circle && styles.circle}`}
					style={{ background: createAvatarColor(id) }}>
					<span>{createAvatarName(username)}</span>
				</div>

			}

		</>
	);
}