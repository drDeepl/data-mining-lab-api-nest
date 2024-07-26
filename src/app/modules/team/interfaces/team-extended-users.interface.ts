import { Team, UserTeam } from '@prisma/client';

export interface TeamExtendedUserTeam extends Team {
  users: UserTeam[];
}
