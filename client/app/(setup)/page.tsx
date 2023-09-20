import { redirect } from "next/navigation";
import { getUser } from "../../services/user";
import { getUserServer } from "@/services/server";

const SetupPage = async () => {
  const user = await getUser();
  const { id } = user;
  const server = await getUserServer(id);
  console.log(server, '=> serevr')
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <div>Create a server</div>
}

export default SetupPage;
