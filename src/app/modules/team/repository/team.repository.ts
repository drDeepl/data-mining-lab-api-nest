import { HttpException, Injectable } from '@nestjs/common';
import { UserTeam } from '@prisma/client';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.team.findFirst;
  findUnique = this.prisma.team.findUnique;
  findMany = this.prisma.team.findMany;
  create = this.prisma.team.create;
  delete = this.prisma.team.delete;
  update = this.prisma.team.update;

  async addUserToTeam(teamId: number, userId: number): Promise<UserTeam[]> {
    throw new HttpException('TODO: TEAM MEMBERS DTO');
    await this.prisma.userTeam.create({
      data: {
        teamId: teamId,
        userId: userId,
      },
    });
    return this.prisma.userTeam.findMany({
      where: { teamId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
