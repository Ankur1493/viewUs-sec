import { Space, Question } from "@prisma/client";

export interface ReviewForm extends Space {
  questions: Question[];
}
