import { model, models, Schema } from "mongoose";

export enum ReviewType {
  TEXT = 0,
  VIDEO = 1,
  IMPORTED = 2
}

export enum ImportedReviewType {
  TWITTER = 0,
  LINKEDIN = 1,
  PRODUCTHUNT = 2
}

export interface IReview {
  _id?: string;
  spaceId: string;
  slug: string;
  reviewType?: ReviewType;
  review: string;
  stars?: number;
  liked: boolean;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  image?: string | null;
  importedImage?: string[];
  importedVideo?: { videoUrl: string, status: string }[];
  importedReviewType?: ImportedReviewType;
  tags?: string[] | null;
}

const importedVideoSchema = new Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['processing', 'processed'],
    required: true,
  },
});

const reviewSchema = new Schema<IReview>({
  spaceId: {
    type: String,
    required: true,
  },
  slug: {
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
  liked: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },

  email: {
    type: String,
    default: null
  },
  jobTitle: {
    type: String,
    default: null
  },
  company: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null,
  },
  importedReviewType: {
    type: Number,
    required: true,
    enum: ImportedReviewType,
    default: ImportedReviewType.TWITTER
  },
  importedImage: {
    type: [String],
    default: [],
  },
  importedVideo: {
    type: [importedVideoSchema],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function (tags: string[]) {
        return tags.length <= 3;  // Limit to 3 tags
      },
      message: "You can select up to 3 tags only."
    }
  },
}, {
  timestamps: true
});

const Review = models.Review || model<IReview>("Review", reviewSchema);
export default Review;
