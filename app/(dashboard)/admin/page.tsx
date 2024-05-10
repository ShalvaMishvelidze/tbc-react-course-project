import Admin from "@/components/Admin";
import { getUsers } from "../../../utils/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = cookies();
  const roleCookie = cookieStore.get("role");

  if (roleCookie?.value !== "admin") {
    redirect("/");
  }

  const users = await getUsers();

  return <Admin users={users} />;
};
export default page;
