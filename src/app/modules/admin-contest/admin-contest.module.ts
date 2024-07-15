import { Module } from '@nestjs/common';
import { AdminContestService } from './admin-contest.service';
import { AdminContestController } from './admin-contest.controller';
import { ContestService } from '../contest/contest.service';
import { ContestRepository } from '../contest/repository/contest.repository';

@Module({
  controllers: [AdminContestController],
  providers: [ContestRepository, ContestService,AdminContestService]
})
export class AdminContestModule {}
