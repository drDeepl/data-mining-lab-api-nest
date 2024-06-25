/*
  Warnings:

  - You are about to drop the column `end_application` on the `contests` table. All the data in the column will be lost.
  - You are about to drop the column `start_application` on the `contests` table. All the data in the column will be lost.
  - Added the required column `end_contest` to the `contests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_contest` to the `contests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contests" DROP COLUMN "end_application",
DROP COLUMN "start_application",
ADD COLUMN     "end_contest" TIMESTAMP NOT NULL,
ADD COLUMN     "start_contest" TIMESTAMP NOT NULL;
