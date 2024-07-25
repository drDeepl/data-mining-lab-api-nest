import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { SocketWithAuth } from '../types';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { TokenPayloadInterface } from 'src/app/modules/auth/interfaces/token-payload.interface';

export const createTokenMidleware =
  (jwtService: JwtService, logger: Logger, authService: AuthService) =>
  (socket: SocketWithAuth, next: NextFunction) => {
    const accessToken =
      socket.handshake.auth.token || socket.handshake.headers['token'];

    logger.debug(`Validatiing auth token before connection: ${accessToken}`);
    authService
      .validateToken(accessToken)
      .then((tokenPayload: TokenPayloadInterface) => {
        socket.userId = tokenPayload.sub;
        socket.role = tokenPayload.role;
        next();
      })
      .catch((error) => {
        logger.error(error);
        next(new Error('ACCESS_DENIDED'));
      });
  };
