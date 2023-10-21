class UsersSockets {
	users: Record<string, string> = {};

	getUser(id: number) {
		return this.users[id];
	}

	getAll() {
		return this.users;
	}

	setUser(id: number, socketId: string) {
		this.users[id] = socketId;
	}

	deleteUser(id: number) {
		delete this.users[id];
	}

	getKeyByValue(socketId: string) {
		for (const key in this.users) {
			if (this.users[key] === socketId) return key;
		}
	};
}

export default new UsersSockets();
