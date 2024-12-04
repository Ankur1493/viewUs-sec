import { ProfileSettings } from "@/components/extras/ProfileSettings";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import { AccountSettings } from "@/components/extras/AccountSettings";
import SettingDetails from "@/components/extras/SettingDetails";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  const userDetails = await getUserById(user.id!);
  if (!userDetails) {
    return <div>Can not find your profile, maybe try logging out</div>;
  }

  return (
    <div className="flex px-16 w-full gap-16">
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-4xl font-bold text-black">Settings</h1>
        <div className="flex flex-col gap-4">
          <ProfileSettings user={userDetails} />
          <AccountSettings user={userDetails} />
        </div>
      </div>
      <SettingDetails />
    </div>
  );
}
