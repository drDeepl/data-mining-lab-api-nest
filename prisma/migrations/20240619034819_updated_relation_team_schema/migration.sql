/*
  Warnings:

  - A unique constraint covering the columns `[team_id]` on the table `applications_contests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applications_contests_team_id_key" ON "applications_contests"("team_id");
