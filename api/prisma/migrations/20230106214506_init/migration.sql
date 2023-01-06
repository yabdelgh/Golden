-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "redCornerId" INTEGER NOT NULL,
    "blueCornerId" INTEGER NOT NULL,
    "map" TEXT NOT NULL DEFAULT 'default',

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_redCornerId_fkey" FOREIGN KEY ("redCornerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_blueCornerId_fkey" FOREIGN KEY ("blueCornerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
