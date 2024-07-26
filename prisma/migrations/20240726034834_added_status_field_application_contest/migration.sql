-- CreateEnum
CREATE TYPE "CONTEST_STATUS" AS ENUM ('SENDED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "applications_contests" ADD COLUMN     "status" "CONTEST_STATUS" NOT NULL DEFAULT 'SENDED';