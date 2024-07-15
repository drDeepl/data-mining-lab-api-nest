import { User } from '@prisma/client';
import { BaseTeamMemberDto } from './base-team-member.dto';

export class TeamMemberDto extends BaseTeamMemberDto {
  constructor(user: User) {
    super(user.id, user.firstName, user.lastName);
  }
}
