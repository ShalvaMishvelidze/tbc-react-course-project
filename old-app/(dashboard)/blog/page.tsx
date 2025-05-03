import Blogs from "@/old-components/Blogs";
import LoadingSpinner from "@/old-components/LoadingSpinner";
import { getSystemPreferences } from "@/utils/server_actions";
import { libraries } from "@/utils/constants";

const page = async () => {
  const { language } = await getSystemPreferences();
  const text = libraries[language].main.blog;

  if (!text) {
    return <LoadingSpinner />;
  }

  return <Blogs text={text} />;
};

export default page;
