import { createReview } from "@/data/review";
import { db } from "@/lib/db";
import { textReviewSchema } from "@/schemas/review";
import { NextResponse } from "next/server";
import { getSpaceReviewsLength } from "@/data/review";
import { sendTextReviewSubmitted } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { reviewDetails, spaceId } = await req.json();

    // Validate the spaceId
    if (!spaceId || typeof spaceId !== "string") {
      return NextResponse.json({ success: false, error: "Invalid space ID" }, { status: 400 });
    }

    // Validate the review details
    const validatedFields = textReviewSchema.safeParse(reviewDetails);
    if (!validatedFields.success) {
      return NextResponse.json({ success: false, error: "Invalid review fields" }, { status: 400 });
    }

    const { review, stars, name, email, jobTitle, company, image } = validatedFields.data;

    // Check if space exists
    const spaceDetails = await db.space.findUnique({
      where: { id: spaceId },
      include: { user: true }
    });

    if (!spaceDetails) {
      return NextResponse.json({ success: false, error: "Space not found" }, { status: 404 });
    }

    // Create the review
    const reviewCreated = await createReview({
      spaceId,
      review,
      stars,
      name,
      email,
      jobTitle,
      company,
      image,
    });

    if (!reviewCreated) {
      return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 });
    }

    // Get space reviews count
    const spaceReviews = await getSpaceReviewsLength(spaceId);
    if (spaceReviews.err) {
      return NextResponse.json({ success: false, error: "Could not retrieve space reviews" }, { status: 500 });
    }
    if (spaceReviews.success) {
      sendTextReviewSubmitted({ email: spaceDetails.user.email, reviewCount: spaceReviews.data.textReviews, spaceTitle: spaceDetails.title })
    }

    return NextResponse.json({
      success: true,
      message: "Review created successfully",
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: "Internal server error",
    }, { status: 500 });
  }
}
