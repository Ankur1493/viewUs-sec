import { auth } from "@/auth";
import { updateTestimonialLikeStatus } from "@/data/review";
import { ratelimit } from "@/lib/ratelimit";
import { redis } from "@/lib/redisCache";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { connectToMongo } from "@/lib/mongoose";
import Review from "@/models/review_model";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
) {
  try {
    const reqUrl = new URL(req.url)
    const slug = reqUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Missing slug parameter" },
        { status: 400 }
      );
    }
    const cacheKey = `reviews:${slug}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      try {
        //@ts-ignore
        if (cachedData && Array.isArray(cachedData.reviews)) {
          return NextResponse.json(
            {
              success: true,
              data: cachedData,
              message: 'Data retrieved from cache',
            },
            { status: 200 }
          );
        } else {
          console.error('Cached data format is not as expected');
        }
      } catch (err) {
        console.error('Error parsing cached data:', err);
      }
    }
    await connectToMongo();

    // Use Promise.all to run both queries concurrently
    const [space, reviews] = await Promise.all([
      db.space.findUnique({
        where: {
          slug,
        },
      }),
      Review.find({ slug }).sort({ updatedAt: 1 }).select({
        _id: 1,
        reviewType: 1,
        review: 1,
        stars: 1,
        firstName: 1,
        lastName: 1,
        jobTitle: 1,
        company: 1,
        image: 1,
        importedReviewType: 1,
        importedImage: 1,
        importedVideo: 1,
        tags: 1
      })
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
      reviews,
    };

    await redis.set(cacheKey, responseData, {
      ex: 3600
    });

    return NextResponse.json({
      success: true,
      data: responseData,
      message: "here is your data"
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user
    if (!user) {
      return NextResponse.json({
        status: "failed",
        data: null,
        message: "Please log in first",
      }, { status: 401 });
    }
    const { success } = await ratelimit.limit(user.id!)

    if (!success) {
      return NextResponse.json({
        success: false,
        message: "Limit reached, try again in few seconds",
      }, { status: 429 });

    }

    const { id, liked } = await req.json();

    const likedUpdated = await updateTestimonialLikeStatus({ id, liked })

    if (likedUpdated.err) {
      return NextResponse.json({
        success: false,
        message: "Internal server error",
      }, { status: 403 });
    }


    return NextResponse.json({
      success: true,
      message: "Review updated",
      data: likedUpdated.likeUpdated
    }, { status: 200 });


  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }

}
