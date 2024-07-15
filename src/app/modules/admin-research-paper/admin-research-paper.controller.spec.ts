import { Test, TestingModule } from '@nestjs/testing';
import { AdminResearchPaperController } from './admin-research-paper.controller';

describe('AdminResearchPaperController', () => {
  let controller: AdminResearchPaperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminResearchPaperController],
    }).compile();

    controller = module.get<AdminResearchPaperController>(AdminResearchPaperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
