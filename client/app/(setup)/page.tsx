import { initUser } from "@/lib/initial-profile";

const SetupPage = async () => {
  initUser();
  return <div>Create a server</div>
}

export default SetupPage;
