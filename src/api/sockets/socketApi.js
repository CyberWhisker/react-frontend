import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_API;
const socketApi = io(SOCKET_URL, {
    // options if needed
});

// Example: listen for new messages
export const subscribeToMessages = (callback) => {
    socket.on('receive_message', callback);
};

// To stop listening (cleanup)
export const unsubscribeFromMessages = () => {
    socket.off('receive_message');
};

// Emit a message event
export const sendMessage = (message) => {
    socket.emit('send_message', message);
};

export default socketApi;
