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
    <div className="flex flex-col py-8 lg:flex-row px-8 md:px-12 w-full gap-8 pb-4">
      <div className="flex flex-col gap-10 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your profile and account settings.
          </p>
        </div>
        <div className="flex flex-row gap-10 w-full">
          <div className="flex basis-3/5 flex-col gap-4 w-[90%]">
            <ProfileSettings user={userDetails} />
            <AccountSettings user={userDetails} />
          </div>
          <div className="basis-2/5">
            <SettingDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
