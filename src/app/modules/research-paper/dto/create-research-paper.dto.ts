import { ApiProperty } from '@nestjs/swagger';
import { BaseResearchPaperDto } from './base-research-paper.dto';

export class CreateResearchPaperDto extends BaseResearchPaperDto {
  @ApiProperty({
    description: 'статус научной статьи(занята или нет)',
    nullable: false,
    required: true,
  })
  isFree: boolean;

  constructor(name: string, description: string, isFree: boolean) {
    super(name, description);
    this.isFree = isFree;
  }
}
