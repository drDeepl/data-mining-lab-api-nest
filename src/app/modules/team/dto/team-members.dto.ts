import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';
import { BaseTeamDto } from './base-team.dto';
import { TeamDto } from './team.dto';
import { User } from '@prisma/client';
import { BaseTeamMemberDto } from './base-team-member.dto';
import { TeamMemberDto } from './team-member.dto';

export class TeamMembersDto extends TeamDto {
  @ApiProperty({
    description: 'список пользователей в команде',
    nullable: false,
    required: true,
  })
  teamMembers: BaseTeamMemberDto[];

  constructor(id: number, name: string, usersInTeam: User[]) {
    super(id, name);
    this.teamMembers = usersInTeam.map(
      (user) => new TeamMemberDto(user.id, user.firstName, user.lastName),
    );
  }
}
