/*
  Warnings:

  - Added the required column `album` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "album" TEXT NOT NULL,
ADD COLUMN     "release" TEXT NOT NULL;
