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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { ContestDto } from './dto/contest.dto';
import { ROLE } from '@prisma/client';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { UpdateContestDto } from './dto/update-contest.dto';

@ApiTags('ContestController')
@Controller('contests')
export class ContestController {
  private readonly logger = new Logger(ContestController.name);

  constructor(private readonly contestService: ContestService) {}

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
  @Post('/admins')
  async createContest(
    @Body() createContestDto: CreateContestDto,
  ): Promise<ContestDto> {
    try {
      return await this.contestService.createContest(createContestDto);
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'обнолвение данных конкурса' })
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
  @Put('/admins/:contestId')
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
      createException(error, this.logger);
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
  @Delete('/admins/:contestId')
  async deleteContestById(
    @Param('contestId', ParseIntPipe) contestId: number,
  ): Promise<void> {
    try {
      await this.contestService.deleteContestById(contestId);
    } catch (error) {
      createException(error, this.logger);
    }
  }

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
      createException(error, this.logger);
    }
  }
}
