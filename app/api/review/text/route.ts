import { createReview } from "@/data/review";
import { db } from "@/lib/db";
import { textReviewSchema } from "@/schemas/review";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { reviewDetails, spaceId } = await req.json();
    const validatedFields = textReviewSchema.safeParse(reviewDetails);

    if (!spaceId || typeof spaceId !== "string") {
      return new NextResponse("review form id are not valid", { status: 403 });
    }
    if (!validatedFields.success) {
      return new NextResponse("Fields are not validated", { status: 401 });
    }

    const { review, stars, name, email, designation, image } = validatedFields.data;

    const spaceDetails = await db.space.findUnique({
      where: { id: spaceId },
      include: { user: true, questions: true }
    });

    if (!spaceDetails) {
      return new NextResponse("review form not found", { status: 404 });
    }

    if (spaceDetails.questions.length < 15) {
      if (spaceDetails.questions.length < 10) {
        const reviewCreated = await createReview({
          spaceId,
          review,
          stars,
          name,
          email,
          designation,
          image,
        });
        if (!reviewCreated) {
          return NextResponse.json("Failed to create review", { status: 500 });
        } else {
          //add a email service call here, to send a mail to user
          return NextResponse.json("Review created successfully", { status: 200 });
        }
      } else {
        const reviewCreated = await createReview({
          spaceId,
          review,
          stars,
          name,
          email,
          designation,
          image,
        });
        if (!reviewCreated) {
          return NextResponse.json("Failed to create review", { status: 500 });
        } else {
          //add a email service call here,to send a mail to user notifying them that they have reviews more that 10 now, they need to update 
          return NextResponse.json("Review created successfully", { status: 200 });
        }
      }
    } else {
      return NextResponse.json("Review can't be created as review limit is over", { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

