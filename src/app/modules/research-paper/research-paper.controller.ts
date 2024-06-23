import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROLE } from '@prisma/client';
import { createException } from 'src/app/helpers/create-exception.helper';
import TokensDto from '../auth/dto/tokens.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { CreatedResearchPaperDto } from './dto/created-research-paper.dto';
import { ResearchPaperService } from './research-paper.service';

@ApiTags('ResearchPaperController')
@Controller('research-papers')
export class ResearchPaperController {
  private readonly logger = new Logger(ResearchPaperController.name);

  constructor(private readonly researchPaperSerice: ResearchPaperService) {}

  @ApiOperation({ summary: 'создание темы научной статьи' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @ApiBody({
    type: CreateResearchPaperDto,
    description: 'данные для добавления научной статьи',
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
  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  async addResearchPaper(
    @Body() createResearchPaperDto: CreateResearchPaperDto,
  ): Promise<CreatedResearchPaperDto> {
    try {
      return this.researchPaperSerice.createResearchPaper(
        createResearchPaperDto,
      );
    } catch (error) {
      createException(error, this.logger);
    }
  }
}