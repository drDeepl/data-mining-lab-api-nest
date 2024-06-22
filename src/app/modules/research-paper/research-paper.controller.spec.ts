import { Test, TestingModule } from '@nestjs/testing';
import { ResearchPaperController } from './research-paper.controller';

describe('ResearchPaperController', () => {
  let controller: ResearchPaperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchPaperController],
    }).compile();

    controller = module.get<ResearchPaperController>(ResearchPaperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
