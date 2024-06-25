import { Injectable, Logger } from '@nestjs/common';
import { Contest } from '@prisma/client';
import { contestPrismaErrorMessage } from 'src/app/constants/messages/error-prisma-exception-description';
import { PrismaExceptionHandler } from 'src/app/helpers/PrismaExceptionHandler';
import { ContestRepository } from './repository/contest.repository';

@Injectable()
export class ContestService {
  private readonly logger = new Logger(ContestService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    contestPrismaErrorMessage,
  );

  constructor(private readonly contestRepository: ContestRepository) {}

  //   try {
  // } catch (error) {
  //   throw this.prismaExceptionHandler.handleError(error);
  // }

  async createContest(dto: CreateContestDto): Promise<ContestDto> {
    try {
      const createdContest: Contest = await this.contestRepository.create({
        data: dto,
      });
      return new ContestDto(
        createdContest.id,
        createdContest.name,
        createdContest.startApplication,
        createdContest.endApplication,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
