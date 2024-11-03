import { NextRequest, NextResponse } from "next/server";
import { profileSchema } from "@/schemas/user";
import { auth } from "@/auth";
import { updateUser } from "@/data/user";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { CreateInvalidationCommand } from "@aws-sdk/client-cloudfront"
import sharp from "sharp";
import { s3, cloudFrontObject } from "@/lib/aws";

export async function POST(req: NextRequest) {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME!;

    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({
        status: "failed",
        data: null,
        message: "Please log in first",
      }, { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const company = formData.get("company") as string | null;
    const jobTitle = formData.get("jobTitle") as string | null;
    const image = formData.get("image") as File | null;

    const validatedFields = profileSchema.safeParse({
      name,
      company,
      jobTitle,
      email: user.email,
      image: image ? image : user.image,
    });

    if (!validatedFields.success) {
      return NextResponse.json({
        status: false,
        data: null,
        message: "Invalid input values",
      }, { status: 400 });
    }

    let imageName = null;

    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const resizedBuffer = await sharp(buffer)
        .resize({ height: 50, width: 50, fit: "contain" })
        .toBuffer();

      const fileType = image.type;

      const params = {
        Bucket: bucketName,
        Key: `profile/${user.id}-${user.email}-profile-picture`,
        Body: resizedBuffer,
        ContentType: fileType,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      imageName = `profile/${user.id}-${user.email}-profile-picture`;

      const invalidationParams = {
        DistributionId: process.env.DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `${imageName}-${Date.now()}`,
          Paths: {
            Quantity: 1,
            Items: [
              "/" + imageName
            ]
          }
        },
      }

      const invalidationCommand = new CreateInvalidationCommand(invalidationParams)
      await cloudFrontObject.send(invalidationCommand)
    }

    const updatedUser = await updateUser({
      id: user.id!,
      name: validatedFields.data.name,
      image: imageName,
      jobTitle: validatedFields.data.jobTitle,
      company: validatedFields.data.company,
    });

    if (!updatedUser) {
      return NextResponse.json({
        status: false,
        data: null,
        message: "Profile update failed. Try again later.",
      }, { status: 500 });
    }

    return NextResponse.json({
      status: true,
      data: updatedUser,
      message: "Profile updated successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({
      status: false,
      data: null,
      message: "An error occurred while updating the profile.",
    }, { status: 500 });
  }
}

