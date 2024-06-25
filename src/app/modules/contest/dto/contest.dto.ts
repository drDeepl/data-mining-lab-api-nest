import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';
import { BaseContestDto } from './base-contest.dto';

export class ContestDto extends BaseContestDto {
  @ApiProperty({
    description: 'id конкурса',
    required: true,
    nullable: false,
  })
  id: number;

  @ApiProperty({
    description: 'дата публикации конкурса в формате ISO8601',
    required: true,
    nullable: false,
  })
  createdAt: Date;

  constructor(
    id: number,
    name: string,
    startContest: Date,
    endContest: Date,
    createdAt: Date,
  ) {
    super(name, startContest, endContest);
    this.id = id;
    this.createdAt = createdAt;
  }
}
