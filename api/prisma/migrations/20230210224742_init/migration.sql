-- AlterEnum
ALTER TYPE "RoomAccess" ADD VALUE 'DirectMessage';

-- AlterTable
ALTER TABLE "chat_rooms" ALTER COLUMN "name" SET DEFAULT '';
