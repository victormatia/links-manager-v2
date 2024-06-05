-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER,
    "year" INTEGER,
    "startTime" INTEGER,
    "endTime" INTEGER,
    "eventPlace" CHAR(100),

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
