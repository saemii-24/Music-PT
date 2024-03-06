/*
  Warnings:

  - You are about to drop the column `album` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `lyrics` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `release` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "album",
DROP COLUMN "lyrics",
DROP COLUMN "release";
