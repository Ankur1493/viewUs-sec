import { NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp"
import { s3 } from "@/lib/aws";
import { auth } from "@/auth"
import { spaceSchema } from "@/schemas/space"
import { getUserSpacesQty } from "@/data/space"
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/ratelimit";

const bucketName = process.env.AWS_BUCKET_NAME!

export async function POST(req: Request) {
  try {
    const session = await auth()
    const user = session?.user
    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "Cannot change someone else's spaces",
          errors: "Need to login first"
        },
        { status: 400 }
      );
    }
    const { success } = await ratelimit.limit(user.id!)

    if (!success) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Limit reached, try again in few seconds",
      }, { status: 429 });

    }

    // Check user space creation abilities
    const userSpaceQty = await getUserSpacesQty(user.id!)
    console.log({ userSpaceQty })
    if (userSpaceQty === null || Number(userSpaceQty) >= 1) {
      console.log("m yaha phuch gya")
      return NextResponse.json(
        {
          status: false,
          message: "You need to upgrade to create more spaces",
          errors: "Need to upgrade"
        },
        { status: 400 }
      );
    }

    // Parse the incoming FormData
    const formData = await req.formData();

    const spaceCreationDetails = JSON.parse(formData.get("spaceCreationDetails") as string);
    const coverPage = JSON.parse(formData.get("coverPage") as string);
    const userInformation = JSON.parse(formData.get("userInformation") as string);
    const testimonialType = JSON.parse(formData.get("testimonialType") as string);
    const testimonialPageType = JSON.parse(formData.get("testimonialPageType") as string);
    const thankyou = JSON.parse(formData.get("thankyou") as string);
    const design = JSON.parse(formData.get("design") as string);

    const image = formData.get("logo")

    // Validate the parsed data using Zod schema
    const parsedData = spaceSchema.safeParse({
      spaceCreationDetails,
      coverPage,
      userInformation,
      testimonialPageType,
      testimonialType,
      thankyou,
      design
    });

    if (!parsedData.success) {
      return NextResponse.json(
        {
          status: false,
          message: "Validation error",
          errors: parsedData.error.format(),
        },
        { status: 400 }
      );
    }


    let imageName = null
    if (image) {
      const file = image as File; // Explicitly cast image to File type

      // Get the image details
      const fileType = file.type;

      // Convert the file to a buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const resizedBuffer = await sharp(buffer).resize({ height: 50, width: 50, fit: "contain" }).toBuffer()

      // Upload the image to S3
      const params = {
        Bucket: bucketName,
        Key: `space/${parsedData.data.spaceCreationDetails.projectSlug}-${parsedData.data.spaceCreationDetails.projectName}-logo`,
        Body: resizedBuffer,
        ContentType: fileType,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      imageName = `space/${parsedData.data.spaceCreationDetails.projectSlug}-${parsedData.data.spaceCreationDetails.projectName}-logo`
    }


    const result = await db.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: {
          userId: user.id!,
          slug: parsedData.data.spaceCreationDetails.projectSlug,
          name: parsedData.data.spaceCreationDetails.projectName,
        },
      });

      await tx.spaceDetails.create({
        data: {
          spaceId: space.id,
          coverPageTitle: parsedData.data.coverPage.title,
          coverPageBtnText: parsedData.data.coverPage.btnText,
          coverPageDescription: parsedData.data.coverPage.description,
          coverPageImageUrl: imageName,
          userEmail: parsedData.data.userInformation.email,
          userPhoto: parsedData.data.userInformation.userPhoto,
          userCompany: parsedData.data.userInformation.company,
          userJobTitle: parsedData.data.userInformation.jobTitle,
          userLastName: parsedData.data.userInformation.lastName,
          userFirstName: parsedData.data.userInformation.firstName,
          testimonialTextType: parsedData.data.testimonialType.text,
          testimonialVideoType: parsedData.data.testimonialType.video,
          testimonialPageTitle: parsedData.data.testimonialPageType.title,
          testimonialPageDescription: parsedData.data.testimonialPageType.description,
          tags: parsedData.data.testimonialPageType.tags,
          questions: parsedData.data.testimonialPageType.questions,
          questionHeader: parsedData.data.testimonialPageType.questionHeader,
          thankyouTitle: parsedData.data.thankyou.title,
          thankyouMessage: parsedData.data.thankyou.description,
          theme: parsedData.data.design.gradientType,
          btnColor: parsedData.data.design.btnColor,
        }
      });

      return space;
    });


    if (!result) {
      return NextResponse.json(
        {
          status: false,
          message: "Failed to create space details",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Space and space details created successfully",
        data: {
          spaceCreationDetails,
          coverPage,
          userInformation,
          testimonialType,
          testimonialPageType,
          thankyou,
          design,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

