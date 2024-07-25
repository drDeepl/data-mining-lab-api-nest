import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { createException } from 'src/app/helpers/create-exception.helper';
import { extractJwtFromHeader } from 'src/app/helpers/jwt.helper';
import { AuthService } from '../auth.service';
import { TokenPayloadInterface } from '../interfaces/token-payload.interface';

@Injectable()
export class OwnerUserGuard implements CanActivate {
  private readonly logger = new Logger(OwnerUserGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const accessToken: string | null = extractJwtFromHeader(request);
      if (!accessToken) {
        throw new UnauthorizedException('пользователь неавторизован');
      }
      const tokenPayload: TokenPayloadInterface =
        await this.authService.validateToken(accessToken);
      if (Number(tokenPayload.sub) === Number(request.params.id)) {
        return true;
      }
      throw new ForbiddenException('Недостаточно прав для редактирования');
    } catch (error) {
      throw createException(error, this.logger);
    }
  }
}
