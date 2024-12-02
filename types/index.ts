import { Space, SpaceDetails } from "@prisma/client";

export interface ReviewForm extends Space {
  details: SpaceDetails | null;
}

export interface SpaceWithReviewCount extends Space {
  reviewCounts: {
    text: number;
    video: number;
    imported: number;
  };
}
