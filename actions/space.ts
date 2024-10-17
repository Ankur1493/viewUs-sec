"use server"
import { db } from "@/lib/db";
import { connectToMongo } from "@/lib/mongoose";
import Review, { ReviewType } from "@/models/review_model";

export const getSpaceDetails = async (slug: string) => {
  try {
    const space = await db.space.findUnique({
      where: {
        slug,
      },
      include: {
        questions: true,
      },
    });


    return space;
  } catch (error) {
    console.error("Error fetching space details:", error);
    return null
  }
};

export const getUserSpaces = async (userId: string) => {
  try {
    await connectToMongo()
    const spaces = await db.space.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const spacesWithReviewCounts = await Promise.all(
      spaces.map(async (space) => {
        const reviewCounts = await Review.aggregate([
          { $match: { spaceId: space.id } },
          {
            $group: {
              _id: "$reviewType",
              count: { $sum: 1 },
            },
          },
        ]);

        let textCount = 0;
        let videoCount = 0;
        let importedCount = 0;

        reviewCounts.forEach((review) => {
          switch (review._id) {
            case ReviewType.TEXT:
              textCount = review.count;
              break;
            case ReviewType.VIDEO:
              videoCount = review.count;
              break;
            case ReviewType.IMPORTED:
              importedCount = review.count;
              break;
          }
        });

        return {
          ...space,
          reviewCounts: {
            text: textCount,
            video: videoCount,
            imported: importedCount,
          },
        };
      })
    );

    return spacesWithReviewCounts;
  } catch (error) {
    console.error("Error fetching space details:", error);
    return null;
  }
};

