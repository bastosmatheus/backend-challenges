/*
  Warnings:

  - Changed the type of `event_id` on the `event_registration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "event_registration" DROP CONSTRAINT "event_registration_event_id_fkey";

-- AlterTable
ALTER TABLE "event_registration" DROP COLUMN "event_id",
ADD COLUMN     "event_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
