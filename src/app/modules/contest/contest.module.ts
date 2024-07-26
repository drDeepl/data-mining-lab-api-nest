import { Module } from '@nestjs/common';
import { ContestController } from './contest.controller';
import { ContestService } from './services/contest.service';
import { ContestRepository } from './repository/contest.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';
import { AuthModule } from '../auth/auth.module';
import { ContestGateway } from './gateway/contest.gateway';
import { ApplicationContestService } from './services/application-contest.service';

@Module({
  imports: [AuthModule],
  controllers: [ContestController],
  providers: [
    TeamRepository,
    TeamService,
    ContestRepository,
    ContestService,
    ContestGateway,
    ApplicationContestService,
  ],
  exports: [
    TeamRepository,
    TeamService,
    ContestRepository,
    ContestService,
    ContestGateway,
    ApplicationContestService,
  ],
})
export class ContestModule {}
