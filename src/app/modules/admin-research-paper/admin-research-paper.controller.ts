import { Body, Controller, Delete, HttpStatus, Logger, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResearchPaperService } from '../research-paper/research-paper.service';
import { ROLE } from '@prisma/client';
import { createException } from 'src/app/helpers/create-exception.helper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/role/roles';
import { CreateResearchPaperDto } from '../research-paper/dto/create-research-paper.dto';
import { ResearchPaperDto } from '../research-paper/dto/research-paper.dto';
import { UpdateResearchPaperDto } from '../research-paper/dto/update-research-paper.dto';

@ApiTags("AdminResearchPaperController")
@Controller('admin-research-papers')
export class AdminResearchPaperController {
    private readonly logger = new Logger(AdminResearchPaperController.name);

    constructor(private readonly researchPaperService: ResearchPaperService) {}

    @ApiOperation({ summary: 'создание темы научной статьи' })
  @ApiResponse({ status: HttpStatus.OK, type: ResearchPaperDto })
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
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/')
  async addResearchPaper(
    @Body() createResearchPaperDto: CreateResearchPaperDto,
  ): Promise<ResearchPaperDto> {
    try {
      return this.researchPaperService.createResearchPaper(
        createResearchPaperDto,
      );
    } catch (error) {
      createException(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'редактирование темы научной статьи' })
  @ApiResponse({ status: HttpStatus.OK, type: ResearchPaperDto })
  @ApiBody({
    type: UpdateResearchPaperDto,
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
  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/:researchPaperId')
  async editResearchPaperById(
    @Param('researchPaperId', ParseIntPipe) researchPaperId: number,
    @Body() updateResearchPaperDto: UpdateResearchPaperDto,
  ): Promise<ResearchPaperDto> {
    try {
      return this.researchPaperService.updateResearchPaper(
        researchPaperId,
        updateResearchPaperDto,
      );
    } catch (error) {
      createException(error, this.logger);
    }
  }

  
  @ApiOperation({ summary: 'удаление темы научной статьи' })
  @ApiResponse({ status: HttpStatus.OK, type: ResearchPaperDto })
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
  @Delete('/:researchPaperId')
  async deleteResearchPaper(
    @Param('researchPaperId', ParseIntPipe) researchPaperId: number,
  ): Promise<void> {
    try {
      await this.researchPaperService.deleteResearchPaperById(researchPaperId);
    } catch (error) {
      throw createException(error, this.logger);
    }
  }


}
