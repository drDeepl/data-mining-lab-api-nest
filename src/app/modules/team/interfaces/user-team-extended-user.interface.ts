import { User, UserTeam } from "@prisma/client";

export interface UserTeamExtendedUser extends UserTeam {
  user: User
}
