import { auth } from "@/auth";
import { updateTestimonialLikeStatus } from "@/data/review";
import { ratelimit } from "@/lib/ratelimit";
import { NextResponse } from "next/server";

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
