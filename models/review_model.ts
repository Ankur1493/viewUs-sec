import { model, models, Schema, Document } from "mongoose";

enum ReviewType {
  TEXT = 0,
  VIDEO = 1
}

// Interface for the Review model
interface IReview extends Document {
  userId: string;
  spaceId: string;
  reviewType: ReviewType;
  review: string;
  name: string;
  email: string;
  designation: string | null;
  image: string | null;
}

// Mongoose schema
const reviewSchema = new Schema<IReview>({
  userId: {
    type: String,
    required: true,
  },
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

