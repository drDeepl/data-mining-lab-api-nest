import { HttpException, Injectable } from '@nestjs/common';
import { Team, UserTeam } from '@prisma/client';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';
import { AddedUserTeam } from '../interfaces/added-user-team.interface';
import { UserTeamExtendedUser } from '../interfaces/user-team-extended-user.interface';
import { TeamMemberDto } from '../dto/team-member.dto';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.team.findFirst;
  findUnique = this.prisma.team.findUnique;
  findMany = this.prisma.team.findMany;
  create = this.prisma.team.create;
  delete = this.prisma.team.delete;
  update = this.prisma.team.update;

  async isUserExistsInTeam(teamId: number, userId: number): Promise<boolean>{
    const userTeam: UserTeam = await this.prisma.userTeam.findFirst({
      where:{
        teamId: teamId,
        userId: userId
      }
    })
    return !!userTeam
  }

  async addUserToTeam(teamId: number, userId: number): Promise<void> {
    await this.prisma.userTeam.create({
      data: {
        teamId: teamId,
        userId: userId,
      },
    });
  }

 
  async getTeamsMembers(teamId: number): Promise<TeamMemberDto[]>{
    const usersTeam: UserTeamExtendedUser[] = await this.prisma.userTeam.findMany({
      where: {
        teamId: teamId,
      },
      include:{
        user:true
      }
    })
    console.log(usersTeam)
    return usersTeam.map(userTeam => new TeamMemberDto(userTeam.user))
  }
  
}
