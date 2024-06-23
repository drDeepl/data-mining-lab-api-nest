import { Module } from '@nestjs/common';
import { ResearchPaperRepository } from './repository/research-paper.repository';
import { ResearchPaperController } from './research-paper.controller';
import { ResearchPaperService } from './research-paper.service';

@Module({
  controllers: [ResearchPaperController],
  providers: [ResearchPaperRepository, ResearchPaperService],
})
export class ResearchPaperModule {}
