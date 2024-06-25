import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, MaxLength } from 'class-validator';

export class BaseContestDto {
  @ApiProperty({
    description: 'название конкурса',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(128, {
    message: 'название не может быть больше 128 символов',
  })
  name: string;

  @ApiProperty({
    description: 'дата начала конкурса в формате ISO8601"',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'строка должна быть в виде даты в формате ISO8601' },
  )
  startContest: Date;

  @ApiProperty({
    description: 'дата окончания конкурса в формате ISO8601"',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'строка должна быть в виде даты в формате ISO8601' },
  )
  endContest: Date;

  constructor(name: string, startContest: Date, endContest: Date) {
    this.name = name;
    this.startContest = startContest;
    this.endContest = endContest;
  }
}
