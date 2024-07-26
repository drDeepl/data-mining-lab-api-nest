import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';
import {
  ApplicationContestExtendedContestTeam,
  ApplicationContestExtendedTeamUsers,
} from '../interfaces/application-contest/application-contest-extended-contest-team.interface';
import { CreateApplicationContestDto } from '../dto/applicaiton-contest/create-application-contest.dto';
import { CONTEST_STATUS } from '@prisma/client';

@Injectable()
export class ContestRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.contest.findFirst;
  findUnique = this.prisma.contest.findUnique;
  findMany = this.prisma.contest.findMany;
  create = this.prisma.contest.create;
  delete = this.prisma.contest.delete;
  update = this.prisma.contest.update;

  applicationContestFindFirst = this.prisma.applicationContest.findFirst;
  applicationContestFindUnique = this.prisma.applicationContest.findUnique;
  applicationContestFindMany = this.prisma.applicationContest.findMany;
  applicationContestCreate = this.prisma.applicationContest.create;
  applicationContestDelete = this.prisma.applicationContest.delete;
  applicationContestUpdate = this.prisma.applicationContest.update;

  async createApplicationContest(
    contestId: number,
    teamId: number,
    dto: CreateApplicationContestDto,
  ): Promise<ApplicationContestExtendedContestTeam> {
    console.log(dto);
    return await this.applicationContestCreate({
      data: {
        contestId: contestId,
        teamId: teamId,
        githubLink: dto.githubLink,
        googleDocsLink: dto.googleDocsLink,
      },
      include: {
        team: true,
        contest: true,
      },
    });
  }

  async updateApplicationById(
    applicationId: number,
    status: string,
  ): Promise<ApplicationContestExtendedTeamUsers> {
    return this.applicationContestUpdate({
      where: {
        id: applicationId,
      },
      data: {
        status: CONTEST_STATUS[status],
      },
      include: {
        contest: true,
        team: {
          include: { users: true },
        },
      },
    });
  }
}
