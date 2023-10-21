import React from 'react';
import styles from './ItemSendAudio.module.scss';
import axios from '@/configs/axios';
import socket from '@/configs/socket';
import { ItemSendAudioProps } from './ItemSendAudio.props';
import { AudioMutedOutlined, AudioOutlined, StopOutlined } from '@ant-design/icons';
import { RecordingStatusType } from './ItemSendAudio.types';
import ElemButton from '../ElemButton/ElemButtonIcon';
//=========================================================================================================================

export default function ItemSendAudio(props: ItemSendAudioProps): React.JSX.Element {
	const { userId, partnerId, roomId } = props;

	const [permission, setPermission] = React.useState<boolean>(false);
	const [recordingStatus, setRecordingStatus] = React.useState<RecordingStatusType>('inactive');
	const [audioChunks, setAudioChunks] = React.useState<Blob[]>();
	const [stream, setStream] = React.useState<MediaStream>();
	const mediaRecorder = React.useRef<MediaRecorder>();

	const getMicrophonePermission = async () => {
		if ('MediaRecorder' in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({ audio: true });
				setPermission(true);
				setStream(streamData);
			} catch (err) {
				alert(err);
			}
		} else {
			alert('Ваш браузер не позволяет осуществлять аудиозапись');
		}
	};

	const startRecording = async () => {
		setRecordingStatus('recording');
		if (stream) {
			const media = new MediaRecorder(stream);
			mediaRecorder.current = media;
			mediaRecorder.current.start();
			const localAudioChunks: Blob[] = [];
			mediaRecorder.current.ondataavailable = (event) => {
				if (typeof event.data === 'undefined') return;
				if (event.data.size === 0) return;
				localAudioChunks.push(event.data);
			};
			setAudioChunks(localAudioChunks);
		}
	};

	const stopRecording = () => {
		setRecordingStatus('inactive');
		if (mediaRecorder.current) {
			mediaRecorder.current.stop();
			mediaRecorder.current.onstop = async () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });

				const formData = new FormData();
				const fileName = new Date().getTime();
				formData.append('file', audioBlob, `${fileName}.mp3`);

				const { data } = await axios.post('/files/upload', formData);
				socket.emit('CLIENT:create-file-message', { userId, partnerId, roomId, audioUrl: data[0].url });

				setAudioChunks([]);
			};
		}
	};

	return (
		<>
			{!permission &&
				<ElemButton
					className={styles.buttonSend}
					onClick={getMicrophonePermission}>
					<AudioMutedOutlined />
				</ElemButton>}
			{permission && recordingStatus === 'inactive' &&
				<ElemButton
					className={styles.buttonSend}
					onClick={startRecording}>
					<AudioOutlined />
				</ElemButton>}
			{recordingStatus === 'recording' &&
				<ElemButton
					className={styles.buttonSend}
					onClick={stopRecording}>
					<StopOutlined />
				</ElemButton>}
		</>
	);
}