import { Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { ROLE } from '@prisma/client';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { UserDto } from '../user/dto/user.dto';
import { OwnerUserGuard } from '../auth/guards/owner-user.guard';

@ApiTags("AdminUserController")
@Controller('admin-user')
export class AdminUserController {
    private readonly logger = new Logger(AdminUserController.name);
    constructor(private readonly userService: UserService) {}

    
    @ApiOperation({ summary: 'получение списка пользователей' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto, isArray: true })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'появляется, если пользователь с выбранным id не найден',
      type: HttpException,
    })
    @ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'появляется при ошибках валидации полей',
      type: HttpException,
    })
    @Roles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('')
    async getUsers() {
      try {
        return await this.userService.getUsers();
      } catch (error) {
        throw createException(error, this.logger);
      }
    }
    
    @ApiOperation({
        summary: 'удаление пользователя по его Id',
        description:
          'вместе с пользователем удаляются все зависимые от него записи(колонка, карточка, комментарий)',
      })
      @ApiResponse({ status: HttpStatus.OK })
      @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description:
          'появляется при отсутствии access token-a в заголовке или когда пользователь удаляет не себя',
        type: HttpException,
      })
      @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'появляется при ошибках валидации полей',
        type: HttpException,
      })
      @Roles(ROLE.ADMIN)
      @UseGuards(OwnerUserGuard, RoleGuard)
      @Delete('/:id')
      async deleteUserById(@Param('id', ParseIntPipe) userId: number) {
        try {
          await this.userService.deleteUserById(userId);
        } catch (error) {
          throw createException(error, this.logger);
        }
      }

}
