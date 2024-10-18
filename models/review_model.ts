import { model, models, Schema } from "mongoose";

export enum ReviewType {
  TEXT = 0,
  VIDEO = 1,
  IMPORTED = 3
}

export interface IReview {
  id?: string;
  spaceId: string;
  slug: string;
  reviewType?: ReviewType;
  review: string;
  stars: number;
  firstName?: string | null;
  lastName?: string | null;
  email: string | null;
  jobTitle?: string | null;
  company?: string | null;
  image?: string | null;
  importedImage?: string | null;
  importedVideo?: string | null;
  tags?: string[] | null;
}

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
  importedImage: {
    type: String,
    default: null,
    validate: {
      validator: function (this: IReview) {
        return this.reviewType === ReviewType.IMPORTED || !this.importedImage;
      },
      message: "Imported Image can only be set if reviewType is IMPORTED."
    }
  },
  importedVideo: {
    type: String,
    default: null,
    validate: {
      validator: function (this: IReview) {
        return this.reviewType === ReviewType.IMPORTED || !this.importedVideo;
      },
      message: "Imported Video can only be set if reviewType is IMPORTED."
    }
  }, tags: {
    type: [String],
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
