import { db } from "@/lib/db"

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
}

export const updateUser = async ({ id, name, image, company, jobTitle }: { id: string, name: string, image?: string | null, company?: string, jobTitle?: string }) => {

  try {
    const user = await db.user.update({
      where: {
        id
      },
      data: {
        name,
        image,
        company,
        JobTitle: jobTitle,
      }
    })
    return user
  } catch {
    return null
  }
}

export const deleteUser = async (id: string) => {
  try {
    const deleted = await db.user.delete({
      where: {
        id
      }
    })

    return deleted;
  } catch {
    return null
  }
}

