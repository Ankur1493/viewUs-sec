import { createReview } from "@/data/review";
import { db } from "@/lib/db";
import { textReviewSchema } from "@/schemas/review";
import { NextRequest, NextResponse } from "next/server";
import { getSpaceReviewsLength } from "@/data/review";
import { sendTextReviewSubmitted } from "@/lib/mail";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp"
import Review from "@/models/review_model";

const bucketName = process.env.AWS_BUCKET_NAME!
const bucketRegion = process.env.AWS_BUCKET_REGION!
const accessKey = process.env.ACCESS_KEY!
const secretAccessKey = process.env.SECRET_ACCESS_KEY!

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const spaceId = searchParams.get('spaceId');

    if (!spaceId) {
      return NextResponse.json(
        { success: false, message: 'Missing spaceId parameter' },
        { status: 400 }
      );
    }
    const reviews = await Review.find({ spaceId }).sort({ createdAt: -1 });
    if (!reviews) {
      return NextResponse.json(
        { success: false, message: 'Can not find your review' },
        { status: 400 }
      );
    }


    const formattedReviews = reviews.map((review) => ({
      ...review.toObject(),
      imageUrl: `${process.env.CDN_NAME}/${review.image}`,
    }));

    return NextResponse.json({ success: true, reviews: formattedReviews }, { status: 200 });

  } catch (err) {
    console.log(err)
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

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
    const image = formData.get("image")

    // Validate the spaceId
    if (!spaceId || typeof spaceId !== "string") {
      return NextResponse.json({ success: false, error: "Invalid space ID" }, { status: 400 });
    }

    // Validate the review details using textReviewSchema
    const validatedFields = textReviewSchema.safeParse({
      review, stars, firstName, lastName, email, jobTitle, company, tags
    });

    if (!validatedFields.success) {
      return NextResponse.json({ success: false, message: "Invalid review fields", validatedFields }, { status: 400 });
    }

    // Check if space exists
    const spaceDetails = await db.space.findUnique({
      where: { id: spaceId },
      include: { user: true }
    });

    if (!spaceDetails) {
      return NextResponse.json({ success: false, message: "Space not found" }, { status: 404 });
    }

    let imageName = null
    if (image) {
      const file = image as File; // Explicitly cast image to File type

      // Get the image details
      const fileName = file.name;
      const fileType = file.type;

      // Convert the file to a buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const resizedBuffer = await sharp(buffer).resize({ height: 50, width: 50, fit: "contain" }).toBuffer()

      // Upload the image to S3
      const params = {
        Bucket: bucketName,
        Key: `textReviews/${spaceId}-${spaceDetails.slug}-${email}-${fileName}`, // You can customize the path here
        Body: resizedBuffer,
        ContentType: fileType,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      imageName = `textReviews/${spaceId}-${spaceDetails.slug}-${email}-${fileName}`
    }

    // Create the review without saving the image
    const reviewCreated = await createReview({
      spaceId,
      review: validatedFields.data.review,
      stars: validatedFields.data.stars,
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
      email: validatedFields.data.email,
      jobTitle: validatedFields.data.jobTitle,
      company: validatedFields.data.company,
      tags: validatedFields.data.tags,
      image: imageName,
    });

    if (!reviewCreated) {
      return NextResponse.json({ success: false, message: "Failed to create review" }, { status: 500 });
    }

    // Get space reviews count
    const spaceReviews = await getSpaceReviewsLength(spaceId);
    if (spaceReviews.err) {
      return NextResponse.json({ success: false, message: "Could not retrieve space reviews" }, { status: 500 });
    }

    // Send email notification
    if (spaceReviews.success) {
      sendTextReviewSubmitted({
        email: spaceDetails.user.email,
        reviewCount: spaceReviews.data.textReviews,
        spaceTitle: spaceDetails.title
      });
    }

    return NextResponse.json({
      success: true,
      message: "Review created successfully",
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

