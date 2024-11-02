import mongoose from "mongoose";
import { connectToMongo } from "@/lib/mongoose";
import Review, { IReview, ReviewType } from "@/models/review_model";

export const createReview = async ({ spaceId, slug, review, stars, firstName, lastName, email, jobTitle, company, image, reviewType, tags, liked }: IReview) => {
  try {
    await connectToMongo()
    const reviewCreated = await Review.create({
      spaceId,
      slug,
      review,
      stars,
      firstName,
      lastName,
      email,
      jobTitle,
      company,
      image,
      liked,
      reviewType,
      tags
    });

    if (!reviewCreated) {
      return false;
    }
    return reviewCreated.id;
  } catch (err) {
    console.log(err);
    return { err: "failed to create review" };
  }
};

export const getSpaceReviewsLength = async (spaceId: string) => {
  try {
    await connectToMongo();
    const reviews = await Review.find({
      spaceId
    });
    if (!reviews) {
      return { err: "failed to get reviews" }
    }
    const textReviews = reviews.filter(review => review.reviewType === ReviewType.TEXT);
    const videoReviews = reviews.filter(review => review.reviewType === ReviewType.VIDEO);
    const importedReviews = reviews.filter(review => review.reviewType === ReviewType.IMPORTED);

    return {
      success: true,
      data: {
        textReviews: textReviews.length,
        videoReviews: videoReviews.length,
        importedReviews: importedReviews.length
      }
    }
  } catch (err) {
    console.log(err);
    return { err: "failed to get reviews" };
  }
}

export const createImportedReview = async ({ spaceId, slug, review, firstName, image, reviewType, importedReviewType, importedImage, importedVideo }: IReview) => {
  try {
    await connectToMongo()
    const reviewCreated = await Review.create({
      spaceId,
      slug,
      review,
      firstName,
      image,
      reviewType,
      importedReviewType,
      importedImage,
      importedVideo
    });

    if (!reviewCreated) {
      return false;
    }
    return reviewCreated.id;
  } catch (err) {
    console.log(err);
    return { err: "failed to create review" };
  }
};

export const updateTestimonialLikeStatus = async ({ id, liked }: { id: string; liked: boolean }) => {
  try {
    await connectToMongo();

    const likeUpdated = await Review.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { liked }, { new: true });

    if (!likeUpdated) {
      return { err: "failed to update like status" }
    }

    return { success: true, likeUpdated };
  } catch (err) {
    console.log(err);
    return { err: "Failed to update like status" };
  }
};

