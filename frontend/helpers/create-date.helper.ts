import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayOfYear from 'dayjs/plugin/dayOfYear';
//=========================================================================================================================
dayjs.extend(relativeTime);
dayjs.extend(dayOfYear);

export const getDateOrTime = (messageCreatedAt: string) => {
	if (!messageCreatedAt) {
		return ''
	}

	if (dayjs(Date.now()).dayOfYear() - dayjs(messageCreatedAt).dayOfYear() === 0) {
		return dayjs(messageCreatedAt).format('HH.mm')
	} else {
		return dayjs(messageCreatedAt).format('DD.MM.YYYY')
	}
}