import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/db";
import sharp from "sharp";

import { s3 } from "@/lib/aws";
import { videoReviewSchema } from "@/schemas/review";
import { createReview } from "@/data/review";
import { getSpaceReviewsLength } from "@/data/review";
import { sendTextReviewSubmitted } from "@/lib/mail";
import { ReviewType } from "@/models/review_model";

const bucketName = process.env.AWS_BUCKET_NAME
const secondaryBucketName = process.env.AWS_VIDEO_BUCKET_NAME!

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const spaceId = formData.get("spaceId");
    const stars = Number(formData.get("stars"));
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const jobTitle = formData.get("jobTitle") || null;
    const company = formData.get("company") || null;
    const tags = formData.getAll("tags[]") || [];

    const image = formData.get("image");
    const video = formData.get("video");

    // Validation checks (same as before)
    if (!spaceId || typeof spaceId !== "string") {
      return NextResponse.json({ success: false, error: "Invalid space ID" }, { status: 400 });
    }

    // Validate fields using schema
    const validatedFields = videoReviewSchema.safeParse({
      stars, firstName, lastName, email, jobTitle, company, tags
    });

    if (!validatedFields.success) {
      return NextResponse.json({ success: false, message: "Invalid review fields", validatedFields }, { status: 400 });
    }

    // Check space exists
    const spaceDetails = await db.space.findUnique({
      where: { id: spaceId },
      include: { user: true }
    });

    if (!spaceDetails) {
      return NextResponse.json({ success: false, message: "Space not found" }, { status: 404 });
    }

    // Rest of the code remains the same (space reviews count and email notification)
    const spaceReviews = await getSpaceReviewsLength(spaceId);
    if (spaceReviews.err) {
      return NextResponse.json({ success: false, message: "Could not retrieve space reviews" }, { status: 500 });
    }

    if (spaceReviews.data && spaceReviews.data?.videoReviews > 5) {
      return NextResponse.json(
        { success: false, message: "maximum testimonial limit reached" },
        { status: 403 }
      )
    }

    let imageName = null;
    let videoName = null;

    // Handle image upload (same as before)
    if (image) {
      const file = image as File;
      const fileName = file.name;
      const fileType = file.type;
      const buffer = Buffer.from(await file.arrayBuffer());
      const resizedBuffer = await sharp(buffer)
        .resize({ height: 50, width: 50, fit: "contain" })
        .toBuffer();

      const imageParams = {
        Bucket: bucketName,
        Key: `videoReviews/${spaceId}-${spaceDetails.slug}-${email}-${fileName}`,
        Body: resizedBuffer,
        ContentType: fileType,
      };

      const imageCommand = new PutObjectCommand(imageParams);
      await s3.send(imageCommand);
      imageName = `textReviews/${spaceId}-${spaceDetails.slug}-${email}-${fileName}`;
    }

    // Handle video upload
    if (video) {
      const file = video as File;
      const fileName = file.name;
      const fileType = file.type;

      // Validate video file type
      const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      if (!allowedVideoTypes.includes(fileType)) {
        return NextResponse.json({
          success: false,
          message: "Invalid video format. Supported formats: MP4, WebM, QuickTime"
        }, { status: 400 });
      }

      // Optional: Add size limit check
      const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
      if (file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json({
          success: false,
          message: "Video file too large. Maximum size: 100MB"
        }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      const videoParams = {
        Bucket: secondaryBucketName,
        Key: `videos/${spaceId}-${spaceDetails.slug}-${email}-${fileName}`,
        Body: buffer,
        ContentType: fileType,
      };

      const videoCommand = new PutObjectCommand(videoParams);
      await s3.send(videoCommand);
      videoName = `videos/${spaceId}-${spaceDetails.slug}-${email}-${fileName}`;
    }

    // Create the review with both image and video
    const reviewCreated = await createReview({
      spaceId,
      slug: spaceDetails.slug,
      review: videoName!,
      reviewType: ReviewType.VIDEO,
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
      return NextResponse.json({ success: false, message: "Failed to create review" }, { status: 500 });
    }


    if (spaceReviews.data) {
      sendTextReviewSubmitted({
        email: spaceDetails.user.email,
        reviewCount: spaceReviews.data.textReviews,
        spaceTitle: spaceDetails.name
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
