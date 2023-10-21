export const createAudioTimer = (seconds: number) => {
	if (seconds < 10) return `00.0${seconds}`

	if (seconds >= 10 && seconds <= 59) return `00.${seconds}`

	if (seconds >= 60) {
		const min = Math.trunc(seconds / 60);
		const sec = seconds - (60 * min);
		const minResult = min < 10 ? `0${min}` : `${min}`
		const secResult = sec < 10 ? `0${sec}` : `${sec}`

		return `${minResult}.${secResult}`
	}
}