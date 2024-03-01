/*
  Warnings:

  - Added the required column `updated_at` to the `events` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `event_time` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "event_date" SET DATA TYPE DATE,
DROP COLUMN "event_time",
ADD COLUMN     "event_time" TIME NOT NULL,
ALTER COLUMN "registration_start_date" SET DATA TYPE DATE,
ALTER COLUMN "registration_end_date" SET DATA TYPE DATE;
