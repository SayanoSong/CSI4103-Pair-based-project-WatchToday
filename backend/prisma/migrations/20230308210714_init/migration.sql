-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "movies" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
