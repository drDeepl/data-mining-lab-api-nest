import { Module } from '@nestjs/common';
import { ResearchPaperService } from './research-paper.service';
import { ResearchPaperController } from './research-paper.controller';

@Module({
  providers: [ResearchPaperService],
  controllers: [ResearchPaperController]
})
export class ResearchPaperModule {}
