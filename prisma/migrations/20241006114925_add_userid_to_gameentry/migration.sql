/*
  Warnings:

  - You are about to drop the column `userName` on the `GameEntry` table. All the data in the column will be lost.
  - Added the required column `userId` to the `GameEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameEntry" DROP CONSTRAINT "GameEntry_userName_fkey";

-- AlterTable
ALTER TABLE "GameEntry" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "GameEntry_lpm_userId_idx" ON "GameEntry"("lpm", "userId");

-- AddForeignKey
ALTER TABLE "GameEntry" ADD CONSTRAINT "GameEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
