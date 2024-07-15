import { Module } from '@nestjs/common';
import { AdminResearchPaperController } from './admin-research-paper.controller';
import { AdminResearchPaperService } from './admin-research-paper.service';
import { ResearchPaperService } from '../research-paper/research-paper.service';
import { ResearchPaperRepository } from '../research-paper/repository/research-paper.repository';

@Module({
  controllers: [AdminResearchPaperController],
  providers: [ResearchPaperRepository, ResearchPaperService, AdminResearchPaperService]
  
})
export class AdminResearchPaperModule {}
