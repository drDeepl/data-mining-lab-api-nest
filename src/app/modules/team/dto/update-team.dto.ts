import { BaseTeamDto } from './base-team.dto';

export class UpdateTeamDto extends BaseTeamDto {
  constructor(name: string) {
    super(name);
  }
}
