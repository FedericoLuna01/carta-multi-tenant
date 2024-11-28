import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');

export const joinUserRoom = (userId: string) => {
  socket.emit('joinRoom', userId);
};

export default socket;
