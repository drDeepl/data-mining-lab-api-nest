import { ApplicationContest, Contest, Team } from "@prisma/client";

export interface ApplicationContestExtendedContestTeam extends ApplicationContest{
    contest: Contest,
    team: Team
}