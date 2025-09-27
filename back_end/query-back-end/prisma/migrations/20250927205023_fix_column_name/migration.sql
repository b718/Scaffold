/*
  Warnings:

  - You are about to drop the column `bookTtile` on the `Books` table. All the data in the column will be lost.
  - Added the required column `bookTitle` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Books" DROP COLUMN "bookTtile",
ADD COLUMN     "bookTitle" TEXT NOT NULL;
