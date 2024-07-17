import { Module } from '@nestjs/common';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';
import { ContestRepository } from './repository/contest.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';

@Module({
  controllers: [ContestController],
  providers: [TeamRepository, TeamService,ContestRepository, ContestService],
})
export class ContestModule {}
