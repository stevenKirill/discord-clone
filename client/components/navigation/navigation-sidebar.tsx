import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";

export const NivagatinSidebar = async () => {
  const profile = await currentProfile();

  if (!currentProfile) {
    return redirect('/');
  };

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  console.log(servers, '=> servers');

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
    </div>
  );
};
