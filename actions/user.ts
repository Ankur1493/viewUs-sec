"use server";

import { auth } from "@/auth";
import { deleteUser } from "@/data/user";

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
