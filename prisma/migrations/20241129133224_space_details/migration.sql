-- DropForeignKey
ALTER TABLE "SpaceDetails" DROP CONSTRAINT "SpaceDetails_spaceId_fkey";

-- AddForeignKey
ALTER TABLE "SpaceDetails" ADD CONSTRAINT "SpaceDetails_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
