-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'owner');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'blocked');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user',
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
