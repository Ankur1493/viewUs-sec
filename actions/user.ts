"use server";

import { auth } from "@/auth";
import { deleteUser, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"

export const deleteUserProfile = async (id: string) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user)
      throw new Error("login before deleting your account")

    if (id !== user.id!)
      throw new Error("try deleting your own profile")

    const deletedUser = await deleteUser(user.id);

    if (!deleteUser) throw new Error("not able to delete your profile, try again later")

    return ({
      status: true,
      data: deletedUser,
      message: "user deleted successfully"
    })


  } catch (err) {
    return ({
      status: false,
      data: null,
      message: err
    })
  }
}

interface UpdateUserPasswordArgs {
  id: string;
  old: string;
  newPass: string;
}

export const updateUserPassword = async ({ id, old, newPass }: UpdateUserPasswordArgs) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!id || !old || !newPass) {
      throw new Error("login before changing your password")
    }

    if (!user)
      throw new Error("login before changing your password")

    if (id !== user.id!)
      throw new Error("try changing your own password")

    const userDetails = await getUserById(id)
    if (!userDetails || !userDetails.password)
      throw new Error("user does not exist")

    const passwordsMatched = await bcrypt.compare(old, userDetails.password)

    if (!passwordsMatched) {
      throw new Error("passwords does not matched, try again")
    }
    const hashedPassword = await bcrypt.hash(newPass, 14);

    const passwordUpdated = await db.user.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    })

    if (!passwordUpdated)
      throw new Error("can not update your password right now, try again later")

    return ({
      status: true,
      message: "user deleted successfully"
    })


  } catch (err) {
    console.log(err)
    return ({
      status: false,
      message: "sorry failed",
      data: null,
    })
  }
}
