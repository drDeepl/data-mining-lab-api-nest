import { HttpException, Injectable } from '@nestjs/common';
import { Team, UserTeam } from '@prisma/client';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';
import { AddedUserTeam } from '../interfaces/added-user-team.interface';
import { UserTeamIncludeUser } from '../interfaces/user-tem-include-user.interface';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.team.findFirst;
  findUnique = this.prisma.team.findUnique;
  findMany = this.prisma.team.findMany;
  create = this.prisma.team.create;
  delete = this.prisma.team.delete;
  update = this.prisma.team.update;

  async addUserToTeam(teamId: number, userId: number): Promise<AddedUserTeam> {
    return await this.prisma.userTeam.create({
      select: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      data: {
        teamId: teamId,
        userId: userId,
      },
    });
  }

  async findTeamMembers(teamId: number): Promise<UserTeamIncludeUser[]> {
    return this.prisma.userTeam.findMany({
      select: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: { teamId },
    });
  }
}
