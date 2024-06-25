import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamRepository } from './repository/team.repository';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamRepository, TeamService],
  exports: [TeamRepository],
})
export class TeamModule {}
