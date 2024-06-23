import Blogs from "@/components/Blogs";
import { getSystemPreferences } from "@/utils/actions";
import { libraries } from "@/utils/constants";
import { getSession } from "@auth0/nextjs-auth0";

const page = async () => {
  const { language } = await getSystemPreferences();
  const text = libraries[language].main.blog;
  const session = await getSession();

  return <Blogs text={text} user={session?.user} />;
};

export default page;
