/*
  Warnings:

  - You are about to drop the column `album` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `jp` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `ko` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `release` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `singer` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "album",
DROP COLUMN "jp",
DROP COLUMN "ko",
DROP COLUMN "release",
DROP COLUMN "singer",
DROP COLUMN "thumbnail",
DROP COLUMN "title",
ADD COLUMN     "jpalbum" TEXT,
ADD COLUMN     "jprelease" TEXT,
ADD COLUMN     "jpsinger" TEXT,
ADD COLUMN     "jpthumbnail" TEXT,
ADD COLUMN     "jptitle" TEXT,
ADD COLUMN     "jptranslate" TEXT,
ADD COLUMN     "koalbum" TEXT,
ADD COLUMN     "korelease" TEXT,
ADD COLUMN     "kosinger" TEXT,
ADD COLUMN     "kothumbnail" TEXT,
ADD COLUMN     "kotitle" TEXT,
ADD COLUMN     "kotranslate" TEXT;
