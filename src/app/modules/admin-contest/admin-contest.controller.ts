import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContestService } from '../contest/services/contest.service';
import { ROLE } from '@prisma/client';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { ContestDto } from '../contest/dto/contest.dto';
import { CreateContestDto } from '../contest/dto/create-contest.dto';
import { UpdateContestDto } from '../contest/dto/update-contest.dto';
import { ApplicaitonContestStatusQueryDto } from '../contest/dto/application-contest-status-query.dto';
import { ApplicationContestService } from '../contest/services/application-contest.service';
import { ApplicationContestDto } from '../contest/dto/applicaiton-contest/application-contest.dto';

@ApiTags('AdminContestController')
@Controller('admin-contests')
export class AdminContestController {
  private readonly logger = new Logger(AdminContestController.name);

  constructor(
    private readonly contestService: ContestService,
    private readonly applicationContestService: ApplicationContestService,
  ) {}

  @ApiOperation({ summary: 'создание конкурса' })
  @ApiBody({
    description: 'данные для обновления конкурса',
    type: CreateContestDto,
  })
  @ApiResponse({ status: HttpStatus.OK, type: ContestDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
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
  async createContest(
    @Body() createContestDto: CreateContestDto,
  ): Promise<ContestDto> {
    try {
      return await this.contestService.createContest(createContestDto);
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'обновление данных конкурса' })
  @ApiBody({
    description: 'данные для обновления конкурса',
    type: UpdateContestDto,
  })
  @ApiResponse({ status: HttpStatus.OK, type: ContestDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
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
  @Put('/:contestId')
  async updateContest(
    @Param('contestId', ParseIntPipe) contestId: number,
    @Body() updateContestDto: UpdateContestDto,
  ): Promise<ContestDto> {
    try {
      return await this.contestService.updateContestById(
        contestId,
        updateContestDto,
      );
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'удаление данных конкурса' })
  @ApiResponse({ status: HttpStatus.OK, type: ContestDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
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
  @Delete('/:contestId')
  async deleteContestById(
    @Param('contestId', ParseIntPipe) contestId: number,
  ): Promise<void> {
    try {
      await this.contestService.deleteContestById(contestId);
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'обновление статуса заявки на участие в конкурсе' })
  @ApiResponse({ status: HttpStatus.OK, type: ApplicationContestDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpException,
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
  @Put('/applications/:applicationContestId/actions/status')
  async changeStatusApllicationContest(
    @Param('applicationContestId', ParseIntPipe) apllicationContestId: number,
    @Query()
    applicationStatusDto: ApplicaitonContestStatusQueryDto,
  ): Promise<ApplicationContestDto> {
    try {
      this.logger.debug(applicationStatusDto.applicationStatus);
      return await this.applicationContestService.updateApplicationById(
        apllicationContestId,
        applicationStatusDto.applicationStatus,
      );
    } catch (error) {
      throw createException(error, this.logger);
    }
  }
}
