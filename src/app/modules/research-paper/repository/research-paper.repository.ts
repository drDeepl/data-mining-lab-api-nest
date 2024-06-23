import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

Injectable();
export class ResearchPaperRepository {
  constructor(private readonly prisma: PrismaService) {}

  findFirst = this.prisma.researchPaper.findFirst;
  findUnique = this.prisma.researchPaper.findUnique;
  findMany = this.prisma.researchPaper.findMany;
  create = this.prisma.researchPaper.create;
  update = this.prisma.researchPaper.update;
  delete = this.prisma.researchPaper.delete;
  
}
