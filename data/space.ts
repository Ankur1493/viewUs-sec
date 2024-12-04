import { db } from "@/lib/db"

export const getUserSpacesQty = async (userId: string) => {
  try {
    const spaces = await db.space.count({
      where: {
        userId,
      },
    });
    console.log({ spaces })

    return spaces
  } catch (err) {
    console.log(err)
    return null
  }
}
