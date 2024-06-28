import { ApiProperty } from '@nestjs/swagger';

import { TeamDto } from './team.dto';

import { TeamMemberDto } from './team-member.dto';
import { UserTeamIncludeUser } from '../interfaces/user-tem-include-user.interface';

export class TeamMembersDto extends TeamDto {
  @ApiProperty({
    description: 'список пользователей в команде',
    nullable: false,
    required: true,
  })
  teamMembers: TeamMemberDto[];

  constructor(id: number, name: string, usersInTeam: UserTeamIncludeUser[]) {
    super(id, name);
    this.teamMembers = usersInTeam.map(
      (userTeamIncludeUser: UserTeamIncludeUser) =>
        new TeamMemberDto(
          userTeamIncludeUser.user.id,
          userTeamIncludeUser.user.firstName,
          userTeamIncludeUser.user.lastName,
        ),
    );
  }
}
