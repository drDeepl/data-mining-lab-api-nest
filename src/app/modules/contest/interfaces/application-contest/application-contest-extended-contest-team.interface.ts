import { ApplicationContest, Contest, Team } from '@prisma/client';
import { TeamExtendedUserTeam } from 'src/app/modules/team/interfaces/team-extended-users.interface';

export interface ApplicationContestExtendedContestTeam
  extends ApplicationContest {
  contest: Contest;
  team: Team;
}

export interface ApplicationContestExtendedTeamUsers
  extends ApplicationContestExtendedContestTeam {
  team: TeamExtendedUserTeam;
}
