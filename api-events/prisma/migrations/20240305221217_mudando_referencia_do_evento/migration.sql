-- DropForeignKey
ALTER TABLE "event_registration" DROP CONSTRAINT "event_registration_event_id_fkey";

-- AlterTable
ALTER TABLE "event_registration" ALTER COLUMN "event_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_name") ON DELETE RESTRICT ON UPDATE CASCADE;
