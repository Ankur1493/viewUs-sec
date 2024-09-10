import { model, models, Schema } from "mongoose";

enum ReviewType {
  TEXT = 0,
  VIDEO = 1
}

export interface IReview {
  spaceId: string;
  reviewType?: ReviewType;
  review: string;
  stars: Number;
  name: string;
  email: string;
  designation?: string | null;
  image?: string | null;
}

const reviewSchema = new Schema<IReview>({
  spaceId: {
    type: String,
    required: true,
  },
  reviewType: {
    type: Number,
    required: true,
    enum: ReviewType,
    default: ReviewType.TEXT
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    default: 5
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  }
});

const Review = models.Review || model<IReview>("Review", reviewSchema);
export default Review;

