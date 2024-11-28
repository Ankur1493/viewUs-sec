import { db } from "@/lib/db"
import { SpaceDetails } from "@prisma/client";

export const createSpace = async ({ userId, slug, name }: { userId: string, slug: string, name: string }) => {
  try {
    const space = await db.space.create({
      data: {
        userId,
        slug,
        name,
      },
    });
    if (!space) return null

    return space
  } catch (err) {
    console.log(err)
    return null
  }
}

export const createSpaceDetails = async ({ spaceId, coverPageTitle, coverPageBtnText, coverPageDescription, coverPageImageUrl, userEmail, userPhoto, userCompany, userJobTitle, userLastName, userFirstName, testimonialTextType, testimonialVideoType, testimonialPageTitle, testimonialPageDescription, tags, questions, questionHeader, thankyouTitle, thankyouMessage, theme, btnColor }: SpaceDetails) => {

  try {
    const spaceDetails = await db.spaceDetails.create({
      data: {
        spaceId,
        coverPageTitle,
        coverPageBtnText,
        coverPageDescription,
        coverPageImageUrl,
        userEmail,
        userPhoto,
        userCompany,
        userJobTitle,
        userLastName,
        userFirstName,
        testimonialTextType,
        testimonialVideoType,
        testimonialPageTitle,
        testimonialPageDescription,
        tags,
        questions,
        questionHeader,
        thankyouTitle,
        thankyouMessage,
        theme,
        btnColor
      }
    })

    if (!spaceDetails) return null

    return spaceDetails

  } catch (err) {
    console.log(err)
    return null
  }
}

export const getUserSpacesQty = async (userId: string) => {
  try {
    const spaces = await db.space.count({
      where: {
        userId,
      },
    });
    console.log({ spaces })

    return spaces
  } catch (err) {
    console.log(err)
    return null
  }
}
