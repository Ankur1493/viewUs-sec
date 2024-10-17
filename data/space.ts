"use server"
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


    return space;
  } catch (error) {
    console.error("Error fetching space details:", error);
    return null
  }
};

