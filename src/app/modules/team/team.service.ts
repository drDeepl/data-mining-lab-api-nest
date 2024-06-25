import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { teamPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';
import { TeamRepository } from './repository/team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, UserTeam } from '@prisma/client';
import { TeamMembersDto } from './dto/team-members.dto';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    teamPrismaErrorMessage,
  );

  constructor(private readonly teamRepository: TeamRepository) {}

  async createTeam(dto: CreateTeamDto): Promise<TeamDto> {
    try {
      const createdTeam: Team = await this.teamRepository.create({
        data: {
          name: dto.name,
        },
      });
      return new TeamDto(createdTeam.id, createdTeam.name);
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async updateTeamById(id: number, dto: UpdateTeamDto): Promise<TeamDto> {
    try {
      const updatedTeam: Team = await this.teamRepository.update({
        data: {
          name: dto.name,
        },
        where: { id },
      });
      return new TeamDto(updatedTeam.id, updatedTeam.name);
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async deleteTeamById(id: number): Promise<void> {
    try {
      await this.teamRepository.delete({
        where: { id },
      });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async getTeamById(id: number): Promise<TeamDto> {
    try {
      const team: Team = await this.teamRepository.findUnique({
        where: { id },
      });
      return new TeamDto(team.id, team.name);
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
  async getTeams(): Promise<TeamDto[]> {
    try {
      const teams: Team[] = await this.teamRepository.findMany();
      return teams.map((team) => new TeamDto(team.id, team.name));
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async addUserToTeam(userId: number, teamId: number): Promise<TeamMembersDto> {
    try {
      const teamWithMembers: UserTeam = await this.teamRepository.addUserToTeam(
        teamId,
        userId,
      );
      return new TeamMembersDto();
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
