-- CreateTable
CREATE TABLE "UserResearchPaper" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "research_paper_id" INTEGER NOT NULL,

    CONSTRAINT "UserResearchPaper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserResearchPaper" ADD CONSTRAINT "UserResearchPaper_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResearchPaper" ADD CONSTRAINT "UserResearchPaper_research_paper_id_fkey" FOREIGN KEY ("research_paper_id") REFERENCES "research_papers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
