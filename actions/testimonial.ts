"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import Review from "@/models/review_model"
import { revalidatePath } from "next/cache"
import { connectToMongo } from "@/lib/mongoose";


export const deleteTestimonial = async (id: string, spaceSlug: string) => {
  try {
    const session = await auth()
    const user = session?.user

    if (!user) {
      return ({
        status: false,
        message: "you need to login before deleting a testimonial",
        data: null,
      })
    }

    const validUser = await db.space.findFirst({
      where: {
        slug: spaceSlug,
        userId: user.id
      }
    })

    if (!validUser) {
      return ({
        status: false,
        message: "you cannot delete someone else's testimonial",
        data: null,
      })
    }
    const deletedStatus = await Review.findByIdAndDelete(id)

    if (!deletedStatus) {
      return ({
        status: false,
        message: "sorry we failed to delete your testimonial, try again",
        data: null,
      })
    }

    revalidatePath(`/space/${spaceSlug}`)
    return ({
      status: true,
      message: "deleted testimonial",
      data: null,
    })


  } catch (err) {
    console.log(err)
    return ({
      status: false,
      message: "server error",
      data: null,
    })
  }
}

export const getSpaceReviews = async (slug: string) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return (
        { success: false, message: "login first" }
      );
    }


    await connectToMongo();

    // Use Promise.all to run both queries concurrently
    const [space, allReviews] = await Promise.all([
      db.space.findUnique({
        where: {
          slug,
          userId: user.id
        },
      }),
      Review.find({ slug }).sort({ createdAt: -1 }),
    ]);

    // Check if either space or reviews are null
    if (!space) {
      return (
        { success: false, message: "Space not found" }
      );
    }

    if (!allReviews || allReviews.length === 0) {
      return (
        { success: false, message: "No reviews found" }
      );
    }

    const reviewVariation = {
      text: 0,
      video: 0
    };

    const reviews = allReviews.reduce((acc, review) => {
      // Create buckets for each review type
      switch (review.reviewType) {
        case 0:
          reviewVariation.text++;
          if (acc.text.length < 10) acc.text.push(review);
          break;
        case 1:
          reviewVariation.video++;
          if (acc.video.length < 2) acc.video.push(review);
          break;
        case 2:
          if (acc.imported.length < 7) acc.imported.push(review);
          break;
      }
      return acc;
    }, { text: [], video: [], imported: [] });

    const extraReviews = {
      text: reviewVariation.text - 10,
      video: reviewVariation.video - 2,
    };

    // Combine the filtered reviews
    const filteredReviews = [
      ...reviews.text,
      ...reviews.video,
      ...reviews.imported
    ];

    // Return both space and reviews if both exist
    return (
      {
        success: true,
        data: {
          space,
          reviews: JSON.parse(JSON.stringify(filteredReviews)),
          extraReviews
        }
      }
    );
  } catch (err) {
    console.error(err);
    return (
      {
        success: false,
        message: "Internal server error",
      }
    );
  }
}


