import Blogs from "@/components/Blogs";
import { getSession } from "@auth0/nextjs-auth0";

const page = async () => {
  const session = await getSession();

  return <Blogs user={session?.user} />;
};

export default page;
