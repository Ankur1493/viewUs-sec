"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import Review from "@/models/review_model"
import { revalidatePath } from "next/cache"

export const deleteTestimonial = async (id: string, spaceSlug: string) => {
  try {
    const session = await auth()
    const user = session?.user

    if (!user) {
      return ({
        status: false,
        message: "you need to login before deleting a testimonial",
        data: null,
      })
    }

    const validUser = await db.space.findFirst({
      where: {
        slug: spaceSlug,
        userId: user.id
      }
    })

    if (!validUser) {
      return ({
        status: false,
        message: "you cannot delete someone else's testimonial",
        data: null,
      })
    }
    const deletedStatus = await Review.findByIdAndDelete(id)

    if (!deletedStatus) {
      return ({
        status: false,
        message: "sorry we failed to delete your testimonial, try again",
        data: null,
      })
    }

    revalidatePath(`/space/${spaceSlug}`)
    return ({
      status: true,
      message: "deleted testimonial",
      data: null,
    })


  } catch (err) {
    console.log(err)
    return ({
      status: false,
      message: "server error",
      data: null,
    })
  }
}
