import { TeamController } from './team.controller';
import { TeamRepository } from './repository/team.repository';
import { TeamService } from './team.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TeamController],
  providers: [TeamRepository, TeamService],
  exports: [TeamRepository],
})
export class TeamModule {
}
