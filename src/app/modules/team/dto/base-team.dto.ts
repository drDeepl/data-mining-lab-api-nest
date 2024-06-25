import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class BaseTeamDto {
  @ApiProperty({
    description: 'название команды',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(64, {
    message: 'длина названия команды не может быть больше 64 символов',
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
