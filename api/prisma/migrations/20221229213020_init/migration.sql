-- CreateTable
CREATE TABLE "Challenges" (
    "challengerId" INTEGER NOT NULL,
    "challengedId" INTEGER NOT NULL,

    CONSTRAINT "Challenges_pkey" PRIMARY KEY ("challengerId","challengedId")
);

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_challengedId_fkey" FOREIGN KEY ("challengedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
