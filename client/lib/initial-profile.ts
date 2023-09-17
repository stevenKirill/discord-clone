import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import httpClient from "./http";

export const initUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirectToSignIn();
  }
  const dbUser = await httpClient.post('user', { json: {
    id: clerkUser.id,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
    email: clerkUser.emailAddresses[0].emailAddress,
  }}).json();
  console.log(dbUser, 'CREATED USER');
  return dbUser;
}
