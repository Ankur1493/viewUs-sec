import { Space, SpaceDetails } from "@prisma/client";

export interface ReviewForm extends Space {
  details: SpaceDetails | null;
}
