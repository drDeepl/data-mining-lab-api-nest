import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { ROLE } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { TeamDto } from './dto/team.dto';
import { createException } from 'src/app/helpers/create-exception.helper';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@ApiTags('TeamController')
@Controller('teams')
export class TeamController {
  private readonly logger = new Logger(TeamController.name);

  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'создание команды' })
  @ApiResponse({ status: HttpStatus.OK, type: TeamDto })
  @ApiBody({
    type: CreateTeamDto,
    description: 'данные для создания команды',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'пользователь неавторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'недостаточно прав',
  })
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/admins')
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    try {
      return await this.teamService.createTeam(createTeamDto);
    } catch (error) {
      createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'обновление команды' })
  @ApiResponse({ status: HttpStatus.OK, type: TeamDto })
  @ApiBody({
    type: CreateTeamDto,
    description: 'данные для обновления команды',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'пользователь неавторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'недостаточно прав',
  })
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/admins/:teamId')
  async updateTeamById(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamDto> {
    try {
      return await this.teamService.updateTeamById(teamId, updateTeamDto);
    } catch (error) {
      createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'удаление команды' })
  @ApiResponse({ status: HttpStatus.OK, type: TeamDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'пользователь неавторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'недостаточно прав',
  })
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/admins/:teamId')
  async deleteTeamById(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<void> {
    try {
      await this.teamService.deleteTeamById(teamId);
    } catch (error) {
      createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'добавление пользователя в команду' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'пользователь неавторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'недостаточно прав',
  })
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/admins/:teamId/users/:userId')
  async addUserToTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    try {
      await this.teamService.addUserToTeam(teamId, userId);
    } catch (error) {
      createException(error, this.logger);
    }
  }
}
