import io from 'socket.io-client';
let socket;
const socketio = {
	init: (authToken) => {
    console.log('init')
		socket = io('http://localhost:8081', {
			auth: {
				token: 'bearer ' + authToken,
			},
		});
    return socket;
	},
	getIO: () => {
		if (!socket) {
			throw new Error('Socket.io not initialized');
		}
		return socket;
	},
};

export default socketio;
