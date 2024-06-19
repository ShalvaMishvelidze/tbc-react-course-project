import Admin from "@/components/Admin";
import { getUserRole } from "@/utils/actions/user_actions";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  const role = await getUserRole(session?.user.sub);

  if (role !== "admin") {
    return redirect("/");
  }

  return <Admin />;
};
export default page;
