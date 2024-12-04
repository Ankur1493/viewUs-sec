/*
  Warnings:

  - You are about to drop the column `projectName` on the `SpaceDetails` table. All the data in the column will be lost.
  - You are about to drop the column `projectSlug` on the `SpaceDetails` table. All the data in the column will be lost.
  - Added the required column `name` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpaceDetails" DROP COLUMN "projectName",
DROP COLUMN "projectSlug";
