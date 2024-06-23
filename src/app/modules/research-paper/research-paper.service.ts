import { Injectable, Logger } from '@nestjs/common';
import { ResearchPaper } from '@prisma/client';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';
import { researchPaperPrismaErrorMessage } from 'src/app/utils/constants/error-prisma-exception-description';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { CreatedResearchPaperDto } from './dto/created-research-paper.dto';
import { ResearchPaperRepository } from './repository/research-paper.repository';

@Injectable()
export class ResearchPaperService {
  private readonly logger = new Logger(ResearchPaperService.name);
  private readonly prismaExceptionHandler = new PrismaExceptionHandler(
    researchPaperPrismaErrorMessage,
  );

  constructor(
    private readonly researchPaperRepository: ResearchPaperRepository,
  ) {}

  async createResearchPaper(
    dto: CreateResearchPaperDto,
  ): Promise<CreatedResearchPaperDto> {
    try {
      const createdResearchPaper: ResearchPaper =
        await this.researchPaperRepository.create({
          data: {
            name: dto.name,
            description: dto.description,
          },
        });
      return new CreatedResearchPaperDto(createdResearchPaper);
    } catch (error) {
      this.prismaExceptionHandler.handleError(error);
    }
  }
}
