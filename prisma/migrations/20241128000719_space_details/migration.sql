/*
  Warnings:

  - You are about to drop the column `company_req` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `job_req` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "company_req",
DROP COLUMN "heading",
DROP COLUMN "image",
DROP COLUMN "job_req",
DROP COLUMN "title",
ADD COLUMN     "detailsId" TEXT;

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "SpaceDetails" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "projectSlug" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "coverPageTitle" TEXT NOT NULL,
    "coverPageDescription" TEXT NOT NULL,
    "coverPageImageUrl" TEXT,
    "coverPageBtnText" TEXT NOT NULL,
    "userPhoto" BOOLEAN NOT NULL,
    "userFirstName" BOOLEAN NOT NULL,
    "userLastName" BOOLEAN NOT NULL,
    "userEmail" BOOLEAN NOT NULL,
    "userJobTitle" BOOLEAN NOT NULL,
    "userCompany" BOOLEAN NOT NULL,
    "testimonialTextType" BOOLEAN NOT NULL,
    "testimonialVideoType" BOOLEAN NOT NULL,
    "testimonialPageTitle" TEXT NOT NULL,
    "testimonialPageDescription" TEXT NOT NULL,
    "tags" TEXT[],
    "questionHeader" TEXT NOT NULL,
    "questions" TEXT[],
    "thankyouTitle" TEXT NOT NULL,
    "thankyouMessage" TEXT NOT NULL,
    "theme" INTEGER NOT NULL,
    "btnColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpaceDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpaceDetails_spaceId_key" ON "SpaceDetails"("spaceId");

-- AddForeignKey
ALTER TABLE "SpaceDetails" ADD CONSTRAINT "SpaceDetails_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
