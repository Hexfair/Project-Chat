export const getCountUnreadMessage = (partnerId: number, messages: any) => {
	let count = 0;
	for (let i = 0; i < messages.length; i++) {
		if (messages[i].status === false && messages[i].user === partnerId) {
			count = count + 1;
		}
	}
	return count;
}