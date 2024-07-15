import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminUserController],
  providers: [JwtService, UserRepository, UserService, AuthService, AdminUserService]
})
export class AdminUserModule {}
