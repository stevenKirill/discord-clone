import { redirect } from "next/navigation";
import { getUser } from "../../services/user";
import { getUserServer } from "@/services/server";
import { CreateServerModal } from "@/components/modals/create-server";

const SetupPage = async () => {
  const user = await getUser();
  const { id } = user;
  const server = await getUserServer(id);
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <CreateServerModal />;
}

export default SetupPage;
