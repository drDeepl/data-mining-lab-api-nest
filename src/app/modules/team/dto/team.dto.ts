import { IsInt } from 'class-validator';
import { BaseTeamDto } from './base-team.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TeamDto extends BaseTeamDto {
  @ApiProperty({
    description: 'название научной статьи',
    required: true,
    nullable: false,
  })
  id: number;

  constructor(id: number, name: string) {
    super(name);
    this.id = id;
  }
}
