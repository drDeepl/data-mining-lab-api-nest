import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';

@Injectable()
export class ContestRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.contest.findFirst;
  findUnique = this.prisma.contest.findUnique;
  findMany = this.prisma.contest.findMany;
  create = this.prisma.contest.create;
  delete = this.prisma.contest.delete;
  update = this.prisma.contest.update;
}
