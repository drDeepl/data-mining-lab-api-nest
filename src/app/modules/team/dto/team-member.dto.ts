import { BaseTeamMemberDto } from './base-team-member.dto';

export class TeamMemberDto extends BaseTeamMemberDto {
  constructor(id: number, firstName: string, lastName: string) {
    super(id, firstName, lastName);
  }
}
