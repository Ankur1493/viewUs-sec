import { db } from "@/lib/db"

export const getSpaceDetails = async (slug: string) => {

  const space = await db.space.findUnique({
    where: {
      slug
    },
    include: {
      questions: true
    }
  })
  return space;
}
