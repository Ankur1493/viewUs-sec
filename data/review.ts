import { connectToMongo } from "@/lib/mongoose";
import Review, { IReview } from "@/models/review_model";

export const createReview = async ({ spaceId, review, stars, name, email, designation, image, reviewType }: IReview) => {
  try {
    await connectToMongo()
    const reviewCreated = await Review.create({
      spaceId,
      review,
      stars,
      name,
      email,
      designation,
      image,
      reviewType
    });

    if (!reviewCreated) {
      return false;
    }
    return reviewCreated.id;
  } catch (err) {
    console.log(err);
    return false;
  }
};

