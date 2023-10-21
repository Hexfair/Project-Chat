import React from 'react';
import styles from './WaveSurferPlayer.module.scss';
import { useWavesurfer } from './wavesurfer.hook';
import { PlayCircleFilled } from '@ant-design/icons';
import StopIcon from '@/public/icons/stop.svg';
import { createAudioTimer } from '@/helpers/create-timer.helper';
import ElemButton from '@/components/ElemButton/ElemButtonIcon';
import { WaveSurferOptions } from './WaveSurferPlayer.props';
//===========================================================================================================

export const WaveSurferPlayer = (props: WaveSurferOptions) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
	const [currentTime, setCurrentTime] = React.useState<number>(0);
	const [durationTime, setDurationTime] = React.useState<number>(0);
	const wavesurfer = useWavesurfer(containerRef, props);

	const onPlayClick = React.useCallback(() => {
		wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
	}, [wavesurfer]);

	const onPlay = () => setIsPlaying(true);
	const onPause = () => setIsPlaying(false);
	const changeCurrentTime = (currentTime: number) => setCurrentTime(currentTime);
	const changeDurationTime = (durationTime: number) => setDurationTime(durationTime);

	React.useEffect(() => {
		if (!wavesurfer) return;

		setCurrentTime(0);
		setIsPlaying(false);

		wavesurfer.on('play', onPlay);
		wavesurfer.on('pause', onPause);
		wavesurfer.on('timeupdate', changeCurrentTime);
		wavesurfer.on('decode', changeDurationTime);

		return () => {
			wavesurfer.un('play', onPlay);
			wavesurfer.un('pause', onPause);
			wavesurfer.un('timeupdate', changeCurrentTime);
			wavesurfer.un('decode', changeDurationTime);
		};
	}, [wavesurfer]);

	return (
		<div className={styles.audioPlayer}>
			<ElemButton className={styles.button} onClick={onPlayClick}>
				{isPlaying ? <StopIcon className={styles.stop} /> : <PlayCircleFilled />}
			</ElemButton>
			<div ref={containerRef} />
			<p className={styles.time}>{createAudioTimer(Math.round(durationTime - currentTime))}</p>
		</div>
	);
};