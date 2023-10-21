import React from 'react';
import WaveSurfer from './library/wavesurfer.js';
//===========================================================================================================

export const useWavesurfer = (containerRef: any, options: any) => {
	const [wavesurfer, setWavesurfer] = React.useState<any>();

	React.useEffect(() => {
		if (!containerRef.current) return;

		const ws = WaveSurfer.create({
			...options,
			container: containerRef.current,
		});

		setWavesurfer(ws);

		return () => {
			ws.destroy();
		};
	}, [options, containerRef]);

	return wavesurfer;
};