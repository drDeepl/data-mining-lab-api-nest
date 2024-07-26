import { Injectable, Logger } from '@nestjs/common';
import { ApplicationContest, Contest } from '@prisma/client';
import { contestPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';
import { ContestRepository } from '../repository/contest.repository';
import { ContestDto } from '../dto/contest.dto';
import { CreateContestDto } from '../dto/create-contest.dto';
import { UpdateContestDto } from '../dto/update-contest.dto';
import { ApplicationContestDto } from '../dto/applicaiton-contest/application-contest.dto';
import { CreateApplicationContestDto } from '../dto/applicaiton-contest/create-application-contest.dto';
import { ApplicationContestExtendedContestTeam } from '../interfaces/application-contest/application-contest-extended-contest-team.interface';
import { ContestGateway } from '../gateway/contest.gateway';
import { SocketWithAuth } from '../midlewares/types';

@Injectable()
export class ContestService {
  private readonly logger = new Logger(ContestService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    contestPrismaErrorMessage,
  );

  constructor(
    private readonly contestRepository: ContestRepository,
    private readonly contestGateway: ContestGateway,
  ) {}

  async createContest(dto: CreateContestDto): Promise<ContestDto> {
    try {
      const createdContest: Contest = await this.contestRepository.create({
        data: {
          name: dto.name,
          startContest: dto.startContest,
          endContest: dto.endContest,
        },
      });
      return new ContestDto(
        createdContest.id,
        createdContest.name,
        createdContest.startContest,
        createdContest.endContest,
        createdContest.createdAt,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async updateContestById(
    id: number,
    dto: UpdateContestDto,
  ): Promise<ContestDto> {
    try {
      const updatedContest: Contest = await this.contestRepository.update({
        data: {
          name: dto.name,
          startContest: dto.startContest,
          endContest: dto.endContest,
        },
        where: { id },
      });
      const sockets = await this.contestGateway.getSockets();

      console.log('SOCKETS', sockets);

      return new ContestDto(
        updatedContest.id,
        updatedContest.name,
        updatedContest.startContest,
        updatedContest.endContest,
        updatedContest.createdAt,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async deleteContestById(id: number): Promise<void> {
    try {
      await this.contestRepository.delete({ where: { id } });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async getContests(): Promise<ContestDto[]> {
    try {
      return await this.contestRepository.findMany({
        orderBy: {
          startContest: 'desc',
        },
      });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
