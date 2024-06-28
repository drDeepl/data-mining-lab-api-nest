export interface AddedUserTeam {
  team: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
