import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserNotFoundException } from 'src/app/exceptions/UserNotFoundException';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';

import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    userPrismaErrorMessage,
  );

  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    try {
      return await this.userRepository.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          groupId: true,
        },
      });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async getUserById(userId: number): Promise<UserDto> {
    try {
      const user: UserDto = await this.userRepository.findUnique({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          groupId: true,
        },
        where: { id: userId },
      });
      if (!user) {
        throw new UserNotFoundException('Выбранный пользователь не найден');
      }
      return user;
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async updateUserById(userId: number, dto: UpdateUserDto): Promise<UserDto> {
    try {
      this.logger.error('EDIT USER BY ID');
      console.log(dto);
      const updatedUser: UserDto = await this.userRepository.update({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          groupId: true,
        },
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          groupId: dto.groupId,
        },
        where: { id: userId },
      });
      return updatedUser;
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
  async deleteUserById(userId: number): Promise<any> {
    try {
      await this.userRepository.delete({ where: { id: userId } });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
