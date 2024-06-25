import { ApiProperty } from '@nestjs/swagger';
import { BaseResearchPaperDto } from './base-research-paper.dto';

export class UpdateResearchPaperDto extends BaseResearchPaperDto {
  @ApiProperty({
    description: 'статус научной статьи(true - свободна false - нет)',
    nullable: false,
    required: true,
  })
  isFree: boolean;

  constructor(name: string, description: string, isFree: boolean) {
    super(name, description);
    this.isFree = isFree;
  }
}
