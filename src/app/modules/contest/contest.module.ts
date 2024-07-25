import { Module } from '@nestjs/common';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';
import { ContestRepository } from './repository/contest.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';
import { AuthModule } from '../auth/auth.module';
import { ContestGateway } from './gateway/contest.gateway';

@Module({
  imports: [AuthModule],
  controllers: [ContestController],
  providers: [
    TeamRepository,
    TeamService,
    ContestRepository,
    ContestService,
    ContestGateway,
  ],
  exports: [
    TeamRepository,
    TeamService,
    ContestRepository,
    ContestService,
    ContestGateway,
  ],
})
export class ContestModule {}
