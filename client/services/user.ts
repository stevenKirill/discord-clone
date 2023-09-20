import httpClient from "@/lib/http";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { IUser } from "./types";

export const getUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirectToSignIn();
  }
  const dbUser: IUser = await httpClient.post('user', { json: {
    id: clerkUser.id,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
    email: clerkUser.emailAddresses[0].emailAddress,
  } }).json();
  return dbUser;
};
