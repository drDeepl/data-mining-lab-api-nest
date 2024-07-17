import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContestService } from './contest.service';
import { ContestDto } from './dto/contest.dto';

import { createException } from 'src/app/helpers/create-exception.helper';
import { ApplicationContestDto } from './dto/applicaiton-contest/application-contest.dto';
import { CreateApplicationContestDto } from './dto/applicaiton-contest/create-application-contest.dto';
import { AuthorizedRequest } from '../auth/type/authorized-request';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { MemberTeamGuard } from '../team/guards/member-team.guard';

@ApiTags('ContestController')
@Controller('contests')
export class ContestController {
  private readonly logger = new Logger(ContestController.name);

  constructor(private readonly contestService: ContestService) {}

 
  @ApiOperation({
    summary: 'получение списка конкурсов',
    description: 'список формируется в порядке убывания даты начала конкурса',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ContestDto, isArray: true })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
  })
  @Get('')
  async getContest(): Promise<ContestDto[]> {
    try {
      return await this.contestService.getContests();
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  
  @ApiOperation({
    summary: 'создание заявки на участие в конкурсе',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ApplicationContestDto})
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
  })
  @UseGuards(JwtAuthGuard, MemberTeamGuard)
  @Post('/:contestId/actions/applications/teams/:teamId')
  async createApplicationContest(
    @Param("contestId", ParseIntPipe) contestId: number,
    @Param("teamId", ParseIntPipe) teamId:number,
    @Body() createApplicationContestDto: CreateApplicationContestDto
  ): Promise<ApplicationContestDto> {
    try {
      return await this.contestService.createApplicationContest(contestId,teamId, createApplicationContestDto)
    } catch (error) {
      throw createException(error, this.logger);
    }
  }
}
