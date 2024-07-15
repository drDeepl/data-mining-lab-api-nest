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
import { TeamMemberDto } from './dto/team-member.dto';
import { OwnerUserGuard } from '../auth/guards/owner-user.guard';
import { MemberTeamGuard } from './guards/member-team.guard';
import { AuthorizedRequest } from '../auth/type/authorized-request';

@ApiTags('TeamController')
@Controller('teams')
export class TeamController {
  private readonly logger = new Logger(TeamController.name);

  constructor(private readonly teamService: TeamService) {}



  @ApiOperation({ summary: 'получение списка членов команды для текущего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: TeamDto })
  @ApiBody({
    description: 'данные для обновления команды',
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
  @UseGuards(JwtAuthGuard, MemberTeamGuard)
  @Get('/:teamId/users')
  async getMembersTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
     req: AuthorizedRequest
    ): Promise< TeamMemberDto[]>{
    try {
      return await this.teamService.getTeamsMembers(teamId)    
      
    } catch (error) {
     throw createException(error, this.logger);
    }
  }

}
