import { ApiProperty } from '@nestjs/swagger';
import { ResearchPaper } from '@prisma/client';

export class CreatedResearchPaperDto {
  @ApiProperty({
    description: 'id темы научной статьи',
    nullable: false,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'название темы научной статьи',
    nullable: false,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'описание научной статьи',
    nullable: false,
    required: true,
  })
  description: string;

  @ApiProperty({
    description: 'статус научной статьи(занята или нет)',
    nullable: false,
    required: true,
  })
  isFree: boolean;

  @ApiProperty({
    description: 'дата создания записи',
    nullable: false,
    required: true,
  })
  createdAt: Date;

  constructor(reesearchPaper: ResearchPaper) {
    this.id = reesearchPaper.id;
    this.name = reesearchPaper.name;
    this.description = reesearchPaper.description;
    this.isFree = reesearchPaper.isFree;
    this.createdAt = reesearchPaper.createdAt;
  }
}
