"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { connectToMongo } from "@/lib/mongoose";
import Review, { ReviewType } from "@/models/review_model";
import { revalidatePath } from "next/cache";

export const getSpaceDetails = async ({ slug, userId }: { slug: string, userId: string }) => {
  try {
    const space = await db.space.findUnique({
      where: {
        slug,
      },
      include: {
        details: true
      }
    });

    if (userId !== space?.userId) return null

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

export const deleteSpace = async (spaceId: string) => {
  try {

    const session = await auth();
    const user = session?.user

    if (!user)
      return null


    const result = await db.$transaction([
      db.spaceDetails.delete({
        where: {
          spaceId: spaceId
        }
      }),
      db.space.delete({
        where: {
          id: spaceId,
          userId: user.id
        }
      })
    ]);

    if (!result) return null

    revalidatePath("/dashboard")
    return result
  } catch (error) {
    console.error("Error fetching space details:", error);
    return null
  }
}
