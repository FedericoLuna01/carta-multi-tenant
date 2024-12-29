import { io } from 'socket.io-client';

const socket = io(`${process.env.DOMAIN_NAME || "http://localhost:3001"}`, {
  // path: `${process.env.DOMAIN_NAME ? '/socket.io' : ""}`,
  transports: ['websocket']
});

export const joinUserRoom = (userId: string) => {
  socket.emit('joinRoom', userId);
};

export default socket;
