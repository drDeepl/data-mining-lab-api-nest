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
import { ContestDto } from './dto/contest.dto';

import { createException } from 'src/app/helpers/create-exception.helper';

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
}
