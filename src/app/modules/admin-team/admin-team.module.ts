import { Module } from '@nestjs/common';
import { AdminTeamController } from './admin-team.controller';
import { TeamRepository } from '../team/repository/team.repository';
import { TeamService } from '../team/team.service';

@Module({
  providers: [TeamRepository, TeamService],
  controllers: [AdminTeamController]
})
export class AdminTeamModule {}
