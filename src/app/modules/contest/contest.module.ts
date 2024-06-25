import { Module } from '@nestjs/common';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';
import { ContestRepository } from './repository/contest.repository';

@Module({
  controllers: [ContestController],
  providers: [ContestRepository, ContestService],
})
export class ContestModule {}
