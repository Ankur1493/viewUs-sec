import { db } from "@/lib/db";

export const getSpaceDetails = async (slug: string) => {
  try {
    const space = await db.space.findUnique({
      where: {
        slug,
      },
      include: {
        questions: true,
      },
    });

    // Log the result from the database query
    console.log("Space details fetched from DB:", space);

    return space;
  } catch (error) {
    // Log any errors that occur during the query
    console.error("Error fetching space details:", error);
    throw new Error("Failed to fetch space details");
  }
};

