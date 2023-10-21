export type WaveSurferOptions = {
	/** HTML element or CSS selector */
	container?: HTMLElement | string
	/** The height of the waveform in pixels, or "auto" to fill the container height */
	height?: number | 'auto'
	/** The color of the waveform */
	waveColor?: string | string[] | CanvasGradient
	/** The color of the progress mask */
	progressColor?: string | string[] | CanvasGradient
	/** The color of the playpack cursor */
	cursorColor?: string
	/** The cursor width */
	cursorWidth?: number
	/** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
	barWidth?: number
	/** Spacing between bars in pixels */
	barGap?: number
	/** Rounded borders for bars */
	barRadius?: number
	/** A vertical scaling factor for the waveform */
	barHeight?: number
	/** Vertical bar alignment */
	barAlign?: 'top' | 'bottom'
	/** Minimum pixels per second of audio (i.e. zoom level) */
	minPxPerSec?: number
	/** Stretch the waveform to fill the container, true by default */
	fillParent?: boolean
	/** Audio URL */
	url?: string
	/** Pre-computed audio data */
	peaks?: Array<Float32Array | number[]>
	/** Pre-computed duration */
	duration?: number
	/** Use an existing media element instead of creating one */
	media?: HTMLMediaElement
	/** Play the audio on load */
	autoplay?: boolean
	/** Pass false to disable clicks on the waveform */
	interact?: boolean
	/** Hide the scrollbar */
	hideScrollbar?: boolean
	/** Audio rate */
	audioRate?: number
	/** Automatically scroll the container to keep the current position in viewport */
	autoScroll?: boolean
	/** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
	autoCenter?: boolean
	/** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
	sampleRate?: number
	/** Render each audio channel as a separate waveform */
	splitChannels?: WaveSurferOptions[]
	/** Stretch the waveform to the full height */
	normalize?: boolean
	/** The list of plugins to initialize on start */
	plugins?: any[]
	/** Custom render function */
	renderFunction?: (peaks: Array<Float32Array | number[]>, ctx: CanvasRenderingContext2D) => void
	/** Options to pass to the fetch method */
	fetchParams?: RequestInit
};