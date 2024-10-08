-- AlterTable
ALTER TABLE "UserStats" ADD COLUMN     "bestGameEntryId" TEXT;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_bestGameEntryId_fkey" FOREIGN KEY ("bestGameEntryId") REFERENCES "GameEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
