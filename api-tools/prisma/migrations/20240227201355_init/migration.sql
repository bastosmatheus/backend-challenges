-- CreateTable
CREATE TABLE "Tools" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("id")
);
