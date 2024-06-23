import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class BaseResearchPaperDto {
  @ApiProperty({
    description: 'название научной статьи',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(128, {
    message: 'длина названия статьи не может быть больше 128 символов',
  })
  name: string;

  @ApiProperty({
    description: 'описание научной статьи',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'длина описания статьи не может быть больше 255 символов',
  })
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
