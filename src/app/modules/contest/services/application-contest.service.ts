import { Injectable, Logger } from '@nestjs/common';
import { applicationContestPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';
import { ContestGateway } from '../gateway/contest.gateway';
import { ContestRepository } from '../repository/contest.repository';
import { ApplicationContestDto } from '../dto/applicaiton-contest/application-contest.dto';
import { CreateApplicationContestDto } from '../dto/applicaiton-contest/create-application-contest.dto';
import {
  ApplicationContestExtendedContestTeam,
  ApplicationContestExtendedTeamUsers,
} from '../interfaces/application-contest/application-contest-extended-contest-team.interface';
import { UserTeam } from '@prisma/client';

@Injectable()
export class ApplicationContestService {
  private readonly logger = new Logger(ApplicationContestService.name);

  private prismaExceptionHandler = new PrismaExceptionHandler(
    applicationContestPrismaErrorMessage,
  );

  constructor(
    private readonly contestRepository: ContestRepository,
    private readonly contestGateway: ContestGateway,
  ) {}

  async createApplicationContest(
    contestId: number,
    teamId: number,
    dto: CreateApplicationContestDto,
  ): Promise<ApplicationContestDto> {
    this.logger.debug('CREATE APPLICATION');
    try {
      const createdApplicationContestL: ApplicationContestExtendedContestTeam =
        await this.contestRepository.createApplicationContest(
          contestId,
          teamId,
          dto,
        );
      return new ApplicationContestDto(createdApplicationContestL);
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async updateApplicationById(
    applicationContestId: number,
    status: string,
  ): Promise<ApplicationContestDto> {
    try {
      const updatedApplicationWithUsersTeam: ApplicationContestExtendedTeamUsers =
        await this.contestRepository.updateApplicationById(
          applicationContestId,
          status,
        );
      await this.contestGateway.sendApplicationsByUsersId(
        updatedApplicationWithUsersTeam.team.users.map(
          (userTeam: UserTeam) => userTeam.userId,
        ),
      );
      return new ApplicationContestDto(updatedApplicationWithUsersTeam);
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
