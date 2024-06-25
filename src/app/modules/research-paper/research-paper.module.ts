import { Module } from '@nestjs/common';
import { ResearchPaperRepository } from './repository/research-paper.repository';
import { ResearchPaperController } from './research-paper.controller';
import { ResearchPaperService } from './research-paper.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ResearchPaperRepository, ResearchPaperService],
  controllers: [ResearchPaperController],
  exports: [ResearchPaperService],
})
export class ResearchPaperModule {}
