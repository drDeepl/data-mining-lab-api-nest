import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Request
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ResearchPaperDto } from './dto/research-paper.dto';
import { ResearchPaperService } from './research-paper.service';
import { AuthorizedRequest } from '../auth/type/authorized-request';

@ApiTags('ResearchPaperController')
@Controller('research-papers')
export class ResearchPaperController {
  private readonly logger = new Logger(ResearchPaperController.name);

  constructor(private readonly researchPaperService: ResearchPaperService) {}

  @ApiOperation({ summary: 'получение тем научной статьи' })
  @ApiResponse({ status: HttpStatus.OK, type: ResearchPaperDto, isArray: true })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'пользователь неавторизован',
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getResearchPapers(): Promise<ResearchPaperDto[]> {
    try {
      return await this.researchPaperService.findResearchPapers();
    } catch (error) {
      throw createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'выбор темы научной статьи' })
  @ApiResponse({ status: HttpStatus.OK, type: ResearchPaperDto, isArray: true })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ошибка валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'пользователь неавторизован',
  })
  @UseGuards(JwtAuthGuard)
  @Put('/actions/choice/:researchPaperId')
  async chooseResearchPaperByUser(
    @Param("researchPaperId", ParseIntPipe) researchPaperId: number,
    @Request() req: AuthorizedRequest
  ): Promise<void> {
    try {
      const userId = Number(req.user.sub)
      await this.researchPaperService.setUserResearchPaper(userId, researchPaperId)
    } catch (error) {
      throw createException(error, this.logger);
    }
  }
}
