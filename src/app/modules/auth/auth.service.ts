import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/app/exceptions/UserNotFoundException';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';

import { UserRepository } from '../user/repository/user.repository';

import TokensDto from './dto/tokens.dto';
import { TokenPayloadInterface } from './interfaces/token-payload.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { userPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly prismaExceptionHandler: PrismaExceptionHandler =
    new PrismaExceptionHandler(userPrismaErrorMessage);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, role: string): Promise<TokensDto> {
    const accessToken: string = await this.jwtService.signAsync(
      {
        sub: userId,
        role: role,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_MINS'),
      },
    );
    return new TokensDto(accessToken);
  }
  async validateToken(token: string): Promise<TokenPayloadInterface> {
    try {
      return await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.logger.debug('TOKEN EXPIRED');
        throw new UnauthorizedException('Время действия токена истекло');
      }
      throw new UnauthorizedException('Ошибка проверки токена');
    }
  }

  async signUp(dto: SignUpDto): Promise<TokensDto> {
    try {
      console.log(dto);
      const passwordHash = await this.hashData(dto.password);

      const user: User = await this.userRepository.create({
        data: {
          email: dto.email,
          passwordHash: passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          groupId: dto.groupId,
        },
      });
      return await this.getTokens(user.id, user.role);
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async signIn(dto: SignInDto): Promise<TokensDto> {
    const user: User = await this.userRepository.findUnique({
      where: { email: dto.email },
    });
    console.log(user);
    if (!user) {
      throw new UserNotFoundException(
        'Пользователь с такой электронной почтой не найден',
      );
    }
    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('неверный пароль');
    }
    return await this.getTokens(user.id, user.role);
  }
}
