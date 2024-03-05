/*
  Warnings:

  - A unique constraint covering the columns `[id,event_name,event_date,event_time,limit_participants]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "events_id_event_name_event_date_event_time_limit_participan_key" ON "events"("id", "event_name", "event_date", "event_time", "limit_participants");
