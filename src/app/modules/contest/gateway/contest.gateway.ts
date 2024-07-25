import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import * as config from 'dotenv';
import { Logger } from '@nestjs/common';
import { SocketWithAuth } from '../midlewares/types';

const wss_settings = {
  port: parseInt(process.env.WS_PORT),
  ping_interval: parseInt(process.env.WS_PING_INTERVAL),
  ping_timeout: parseInt(process.env.WS_PING_TIMEOUT),
};

@WebSocketGateway(wss_settings.port, {
  namespace: 'contests',
  pingInterval: wss_settings.ping_interval,
  pingTimeout: wss_settings.ping_timeout,
})
export class ContestGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ContestGateway.name);

  @WebSocketServer()
  io: Namespace;

  constructor() {}

  afterInit(): void {
    this.logger.log('Websocket gateway initialized');
  }

  async handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.log(
      `Websocket Client with: id ${client.id}, userId ${client.userId} and role ${client.role} connected`,
    );
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    this.io.emit('hello', `from ${client.id}`);
  }

  async handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.log(
      `Websocket Client with: id ${client.id}, userId ${client.userId} and role ${client.role} disconnected`,
    );
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
