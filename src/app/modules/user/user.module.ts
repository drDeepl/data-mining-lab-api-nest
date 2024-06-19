import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [JwtService, AuthService, UserRepository, UserService],
})
export class UserModule {}
