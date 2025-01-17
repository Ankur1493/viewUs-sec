import { createReview } from "@/data/review";
import { db } from "@/lib/db";
import { textReviewSchema } from "@/schemas/review";
import { NextRequest, NextResponse } from "next/server";
import { getSpaceReviewsLength } from "@/data/review";
import { sendTextReviewSubmitted } from "@/lib/mail";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { s3 } from "@/lib/aws";

const bucketName = process.env.AWS_BUCKET_NAME!;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract the fields from formData
    const spaceId = formData.get("spaceId");
    const review = formData.get("review");
    const stars = Number(formData.get("stars")); // Ensure stars is treated as a number
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const jobTitle = formData.get("jobTitle") || null;
    const company = formData.get("company") || null;
    const tags = formData.getAll("tags[]") || [];
    const image = formData.get("image");

    // Validate the spaceId
    if (!spaceId || typeof spaceId !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid space ID" },
        { status: 400 }
      );
    }

    // Validate the review details using textReviewSchema
    const validatedFields = textReviewSchema.safeParse({
      review,
      stars,
      firstName,
      lastName,
      email,
      jobTitle,
      company,
      tags,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        { success: false, message: "Invalid review fields", validatedFields },
        { status: 400 }
      );
    }

    // Check if space exists
    const spaceDetails = await db.space.findUnique({
      where: { id: spaceId },
      include: { user: true },
    });

    if (!spaceDetails) {
      return NextResponse.json(
        { success: false, message: "Space not found" },
        { status: 404 }
      );
    }

    // Get space reviews count
    const spaceReviews = await getSpaceReviewsLength(spaceId);
    if (spaceReviews.err) {
      return NextResponse.json(
        { success: false, message: "Could not retrieve space reviews" },
        { status: 500 }
      );
    }

    if (spaceReviews.data && spaceReviews.data?.textReviews > 20) {
      return NextResponse.json(
        { success: false, message: "maximum testimonial limit reached" },
        { status: 403 }
      )
    }

    const randomNumber = Math.floor(Math.random() * 1000) + 50
    let imageName = null;
    if (image) {
      const file = image as File; // Explicitly cast image to File type

      // Get the image details
      const fileName = file.name;
      const fileType = file.type;

      // Convert the file to a buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const resizedBuffer = await sharp(buffer)
        .resize({ height: 200, width: 200, fit: "contain" })
        .toBuffer();

      // Upload the image to S3
      const params = {
        Bucket: bucketName,
        Key: `textReviews/${spaceId}-${spaceDetails.slug}-${email}-${fileName}-${randomNumber}`,
        Body: resizedBuffer,
        ContentType: fileType,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      imageName = `textReviews/${spaceId}-${spaceDetails.slug}-${email}-${fileName}-${randomNumber}`;
    }

    // Create the review without saving the image
    const reviewCreated = await createReview({
      spaceId,
      slug: spaceDetails.slug,
      review: validatedFields.data.review,
      stars: validatedFields.data.stars,
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
      email: validatedFields.data.email,
      jobTitle: validatedFields.data.jobTitle,
      company: validatedFields.data.company,
      tags: validatedFields.data.tags,
      image: imageName,
      liked: false,
    });

    if (!reviewCreated) {
      return NextResponse.json(
        { success: false, message: "Failed to create review" },
        { status: 500 }
      );
    }

    // Send email notification
    if (spaceReviews.success) {
      sendTextReviewSubmitted({
        firstName: spaceDetails.user.name || "",
        reviewerName: validatedFields.data.firstName || "",
        reviewerEmail: validatedFields.data.email,
        email: spaceDetails.user.email,
        reviewCount: spaceReviews.data.textReviews,
        spaceTitle: spaceDetails.name,
        reviewType: "text"
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Review created successfully",
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
