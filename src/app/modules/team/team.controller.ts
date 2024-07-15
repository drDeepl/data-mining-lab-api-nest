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
  Get,
  NotImplementedException,
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

@ApiTags('TeamController')
@Controller('teams')
export class TeamController {
  private readonly logger = new Logger(TeamController.name);

  constructor(private readonly teamService: TeamService) {}
  @ApiOperation({ summary: 'получение списка членов команды' })
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
  @Get('/:teamId')
  async getMembersTeam(
    @Param('teamId', ParseIntPipe) teamId: number
    ){
    try {
      throw new NotImplementedException()
    } catch (error) {
      createException(error, this.logger);
    }
  }

}
