import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/access.strategies';
import { RefreshTokenStrategy } from './strategies/refresh.strategies';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtFactory } from 'src/app/helpers/jwt.helper';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync(jwtFactory),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
  ],
  providers: [
    UserRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
