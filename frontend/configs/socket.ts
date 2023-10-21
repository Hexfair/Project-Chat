import { io } from 'Socket.IO-client';
//===========================================================================================================

const URL = "http://localhost:4000/chat";
const socket = io(URL, { autoConnect: false });

export default socket;