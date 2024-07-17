import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ResearchPaperRepository {
  constructor(private readonly prisma: PrismaService) {}

  findFirst = this.prisma.researchPaper.findFirst;
  findUnique = this.prisma.researchPaper.findUnique;
  findMany = this.prisma.researchPaper.findMany;
  create = this.prisma.researchPaper.create;
  update = this.prisma.researchPaper.update;
  delete = this.prisma.researchPaper.delete;

  async setUserResearchPaper(userId: number, researchPaperId: number): Promise<void>{
    await this.prisma.$transaction([
      this.prisma.userResearchPaper.create({
        data:{
          userId: userId,
          researchPaperId: researchPaperId
        }
      }),

      this.prisma.researchPaper.update({
        data: {
          isFree: false
        },
        where:{
          id: researchPaperId,
        }
      })

    ])
  }
}
