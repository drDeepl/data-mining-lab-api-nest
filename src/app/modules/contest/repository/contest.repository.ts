import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';
import { ApplicationContestExtendedContestTeam } from '../interfaces/application-contest/application-contest-extended-contest-team.interface';
import { CreateApplicationContestDto } from '../dto/applicaiton-contest/create-application-contest.dto';

@Injectable()
export class ContestRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.contest.findFirst;
  findUnique = this.prisma.contest.findUnique;
  findMany = this.prisma.contest.findMany;
  create = this.prisma.contest.create;
  delete = this.prisma.contest.delete;
  update = this.prisma.contest.update;

  async createApplicationContest(contestId: number, teamId:number, dto: CreateApplicationContestDto): Promise<ApplicationContestExtendedContestTeam>{
    console.log(dto)
    return await this.prisma.applicationContest.create({
      data:{
        contestId: contestId,
        teamId: teamId,
        githubLink: dto.githubLink,
        googleDocsLink: dto.googleDocsLink,
      },
      include:{
        team: true,
        contest: true
      }
    })
  }
}
