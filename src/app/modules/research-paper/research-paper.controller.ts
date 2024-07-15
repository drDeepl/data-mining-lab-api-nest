import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ResearchPaperDto } from './dto/research-paper.dto';
import { ResearchPaperService } from './research-paper.service';

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
      createException(error, this.logger);
    }
  }
}
