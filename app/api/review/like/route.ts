import { auth } from "@/auth";
import { updateTestimonialLikeStatus } from "@/data/review";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("req aagyi")
  try {

    const session = await auth();
    if (!session) {
      return NextResponse.json({
        status: "failed",
        data: null,
        message: "Please log in first",
      }, { status: 401 });
    }

    const { id, liked } = await req.json();
    console.log({ id, liked })

    const likedUpdated = await updateTestimonialLikeStatus({ id, liked })

    if (likedUpdated.err) {
      return NextResponse.json({
        success: false,
        message: "Internal server error",
      }, { status: 403 });
    }


    console.log(`req puri hogyi`)
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
