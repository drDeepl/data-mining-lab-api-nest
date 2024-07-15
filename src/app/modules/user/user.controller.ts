import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { createException } from 'src/app/helpers/create-exception.helper';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OwnerUserGuard } from '../auth/guards/owner-user.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from '../auth/role/roles';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('UserController')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}
  

  @ApiOperation({ summary: 'получение пользователя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'появялется, если пользователь с выбранным id не найден',
    type: HttpException,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
  })
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, OwnerUserGuard, RoleGuard)
  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) userId: number) {
    try {
      return await this.userService.getUserById(userId);
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'обновление информации о пользователе' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'появляется при отсутствии access token-a в заголовке или когда пользователь не является владельцем изменяемых данных',
    type: HttpException,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если id пользователя из токена не совпадает с id из параметра запроса',
    type: HttpException,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
  })
  @ApiBody({ type: UpdateUserDto, description: '' })
  @UseGuards(JwtAuthGuard, OwnerUserGuard)
  @Put('/:id')
  async editUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Body() editUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      return await this.userService.updateUserById(userId, editUserDto);
    } catch (error) {
      throw createException(error, this.logger);
    }
  }
}
