import { BaseTeamDto } from './base-team.dto';

export class CreateTeamDto extends BaseTeamDto {
  constructor(name: string) {
    super(name);
  }
}
