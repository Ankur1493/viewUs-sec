import { db } from "@/lib/db";
import { connectToMongo } from "@/lib/mongoose";
import { redis } from "@/lib/redisCache";
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
    const cacheKey = `reviews:${slug}`;
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: JSON.parse(cachedData as string),
        message: "cache se data milgya"
      }, { status: 200 });
    }

    await connectToMongo();

    // Use Promise.all to run both queries concurrently
    const [space, reviews] = await Promise.all([
      db.space.findUnique({
        where: {
          slug,
        },
      }),
      Review.find({ slug }).sort({ updatedAt: 1 }),
    ]);


    if (!space) {
      return NextResponse.json(
        { success: false, message: "Space not found" },
        { status: 404 }
      );
    }

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { success: false, message: "No reviews found" },
        { status: 404 }
      );
    }
    const responseData = {
      success: true,
      reviews,
      message: "here is your data"
    };

    await redis.set(cacheKey, JSON.stringify(responseData), {
      ex: 21600
    });

    return NextResponse.json(responseData, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
