import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, NotImplementedException } from '@nestjs/common';
import { ResearchPaper } from '@prisma/client';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';
import { researchPaperPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { ResearchPaperRepository } from './repository/research-paper.repository';
import { ResearchPaperDto } from './dto/research-paper.dto';
import { UpdateResearchPaperDto } from './dto/update-research-paper.dto';

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
  ): Promise<ResearchPaperDto> {
    try {
      const createdResearchPaper: ResearchPaper =
        await this.researchPaperRepository.create({
          data: {
            name: dto.name,
            description: dto.description,
          },
        });
      return new ResearchPaperDto(
        createdResearchPaper.id,
        createdResearchPaper.name,
        createdResearchPaper.description,
        createdResearchPaper.isFree,
        createdResearchPaper.createdAt,
      );
    } catch (error) {
      this.prismaExceptionHandler.handleError(error);
    }
  }

  async updateResearchPaper(
    id: number,
    dto: UpdateResearchPaperDto,
  ): Promise<ResearchPaperDto> {
    try {
      const updatedResearchPaper = await this.researchPaperRepository.update({
        data: dto,
        where: { id: id },
      });
      return new ResearchPaperDto(
        updatedResearchPaper.id,
        updatedResearchPaper.name,
        updatedResearchPaper.description,
        updatedResearchPaper.isFree,
        updatedResearchPaper.createdAt,
      );
    } catch (error) {
      this.prismaExceptionHandler.handleError(error);
    }
  }

  async deleteResearchPaperById(id: number): Promise<void> {
    try {
      await this.researchPaperRepository.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.prismaExceptionHandler.handleError(error);
    }
  }

  async findResearchPapers(): Promise<ResearchPaperDto[]> {
    try {
      const researchPapers: ResearchPaper[] =
        await this.researchPaperRepository.findMany();
      return researchPapers.map(
        (researchPaper) =>
          new ResearchPaperDto(
            researchPaper.id,
            researchPaper.name,
            researchPaper.description,
            researchPaper.isFree,
            researchPaper.createdAt,
          ),
      );
    } catch (error) {
      this.prismaExceptionHandler.handleError(error);
    }
  }

  async setUserResearchPaper(userId: number, researchPaperId: number): Promise<void>{
    try{
      this.logger.debug(`${userId}: ${researchPaperId}`)
      const researchPaper: ResearchPaper = await this.researchPaperRepository.findUnique({
        where:{
          id: researchPaperId
        }
      })
      
      if(!!researchPaper){
        if(researchPaper.isFree){
          await this.researchPaperRepository.setUserResearchPaper(userId, researchPaperId)
          return
        }
        throw new HttpException("Тема для научной статьи уже выбрана кем-то", HttpStatus.BAD_REQUEST)
      }
      throw new NotFoundException("Тема для научной статьи не найдена")
      
      
    }
    catch (error) {
      this.prismaExceptionHandler.handleError(error);
    }
  }
}
