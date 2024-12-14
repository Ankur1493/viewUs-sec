import { db } from "@/lib/db";
import { connectToMongo } from "@/lib/mongoose";
import Review from "@/models/review_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Missing slug parameter" },
        { status: 400 }
      );
    }

    await connectToMongo();

    // Use Promise.all to run both queries concurrently
    const [space, allReviews] = await Promise.all([
      db.space.findUnique({
        where: {
          slug,
        },
      }),
      Review.find({ slug }).sort({ createdAt: 1 }),
    ]);

    // Check if either space or reviews are null
    if (!space) {
      return NextResponse.json(
        { success: false, message: "Space not found" },
        { status: 404 }
      );
    }

    if (!allReviews || allReviews.length === 0) {
      return NextResponse.json(
        { success: false, message: "No reviews found" },
        { status: 404 }
      );
    }

    const reviewVariation = {
      text: 0,
      video: 0
    };

    const reviews = allReviews.reduce((acc, review) => {
      // Create buckets for each review type
      switch (review.reviewType) {
        case 0:
          reviewVariation.text++;
          if (acc.text.length < 10) acc.text.push(review);
          break;
        case 1:
          reviewVariation.video++;
          if (acc.video.length < 2) acc.video.push(review);
          break;
        case 2:
          if (acc.imported.length < 7) acc.imported.push(review);
          break;
      }
      return acc;
    }, { text: [], video: [], imported: [] });

    const extraReviews = {
      text: reviewVariation.text - 10,
      video: reviewVariation.video - 2,
    };

    // Combine the filtered reviews
    const filteredReviews = [
      ...reviews.text,
      ...reviews.video,
      ...reviews.imported
    ];

    // Return both space and reviews if both exist
    return NextResponse.json(
      {
        success: true,
        space,
        reviews: filteredReviews,
        extraReviews
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

