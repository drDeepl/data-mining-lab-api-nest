import { Socket } from 'socket.io';

type AuthPayload = {
  userId: string;
  role: string;
};

export type SocketWithAuth = Socket & AuthPayload;
