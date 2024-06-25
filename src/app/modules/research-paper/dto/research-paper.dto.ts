import { ApiProperty } from '@nestjs/swagger';
import { BaseResearchPaperDto } from './base-research-paper.dto';

export class ResearchPaperDto extends BaseResearchPaperDto {
  @ApiProperty({
    description: 'id темы научной статьи',
    nullable: false,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'статус научной статьи(true - свободна false - нет)',
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

  constructor(
    id: number,
    name: string,
    description: string,
    isFree: boolean,
    createdAt: Date,
  ) {
    super(name, description);
    this.id = id;
    this.isFree = isFree;
    this.createdAt = createdAt;
  }
}
