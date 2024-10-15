/*
  Warnings:

  - You are about to drop the column `email_req` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `name_req` on the `Space` table. All the data in the column will be lost.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "email_req",
DROP COLUMN "name_req";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;
