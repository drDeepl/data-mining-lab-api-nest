import { Module } from '@nestjs/common';
import { AdminContestService } from './admin-contest.service';
import { AdminContestController } from './admin-contest.controller';

import { ContestModule } from '../contest/contest.module';

@Module({
  imports: [ContestModule],
  controllers: [AdminContestController],
  providers: [AdminContestService],
})
export class AdminContestModule {}
