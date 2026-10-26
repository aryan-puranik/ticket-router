import { Server } from 'socket.io';

let io;

export function initSockets(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    socket.on('disconnect', () => console.log('socket disconnected', socket.id));
  });
  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialised');
  return io;
}