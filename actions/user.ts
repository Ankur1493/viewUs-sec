"use server";
import * as z from "zod"
import { profileSchema } from "@/schemas/user"
import { auth } from "@/auth";
import { updateUser } from "@/data/user";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp"
import { s3 } from "@/lib/aws";

export const updateUserProfile = async (values: z.infer<typeof profileSchema>) => {

  const bucketName = process.env.AWS_BUCKET_NAME!

  const session = await auth();
  const user = session?.user

  if (!user) {
    return {
      status: "failed",
      data: null,
      message: "First try logging in"
    }
  }

  const validatedFields = profileSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      status: false,
      data: null,
      message: "Invalid values passed"
    }
  }

  if (user.email !== validatedFields.data.email) {
    return {
      status: false,
      data: null,
      message: "Try changing your own profile once"
    }
  }
  const { name, company, image, jobTitle } = validatedFields.data

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
      Key: `profile/${user.id}-${user.email}-profile-picture`, // You can customize the path here
      Body: resizedBuffer,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    imageName = `profile/${user.id}-${user.email}-profile-picture`
  }

  const updatedUser = await updateUser({ id: user.id!, name, image: imageName, jobTitle, company })

  if (updatedUser === null) {
    return {
      status: false,
      data: null,
      message: "Failed to update, try again later"
    }
  } else {

    return {
      status: true,
      data: updatedUser,
      message: "Profile Updated"
    }
  }

}
