export const getLastMessage = (partnerId: number, messages: any) => {
	let text = '';
	let createdAt = ''
	for (let i = messages.length - 1; i >= 0; i--) {
		if (messages[i].user === partnerId) {
			text = messages[i].text.length > 0 ? messages[i].text : 'медиа сообщение';
			createdAt = messages[i].createdAt;
			break
		}
	}
	return { text, createdAt };
}