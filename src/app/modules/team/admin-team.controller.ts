import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Next, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ROLE } from '@prisma/client';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';
import { NextFunction } from 'express';
import { TeamMemberDto } from './dto/team-member.dto';

@ApiTags("AdminTeamController")
@Controller('admin-teams')
export class AdminTeamController {
    private readonly logger = new Logger(AdminTeamController.name);
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
  @Post('/')
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    try {
      return await this.teamService.createTeam(createTeamDto);
    } catch (error) {
        throw createException(error, this.logger)
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
  @Put('/:teamId')
  async updateTeamById(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamDto> {
    try {
      return await this.teamService.updateTeamById(teamId, updateTeamDto);
    } catch (error) {
        throw createException(error, this.logger);
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
  @Delete('/:teamId')
  async deleteTeamById(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<void> {
    try {
      await this.teamService.deleteTeamById(teamId);
    } catch (error) {
        throw createException(error, this.logger);
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
  @Put('teams/:teamId/users/:userId')
  async addUserToTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    try {
      await this.teamService.addUserToTeam(teamId, userId);
    } catch (error) {
        throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'получение списка членов команды' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TeamMemberDto,
    isArray: true
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
  @Get('teams/:teamId/users')
  async getTeamsMembers(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<TeamMemberDto[]> {
    try {
      return await this.teamService.getTeamsMembers(teamId);
    } catch (error) {
        throw createException(error, this.logger);
    }
  }
}
