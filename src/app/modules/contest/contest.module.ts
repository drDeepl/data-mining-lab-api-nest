import { Module } from '@nestjs/common';
import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';
import { ContestRepository } from './repository/contest.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ContestController],
  providers: [TeamRepository, TeamService,ContestRepository, ContestService],
})
export class ContestModule {}
