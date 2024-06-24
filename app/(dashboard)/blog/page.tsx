import Blogs from "@/components/Blogs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getSystemPreferences } from "@/utils/actions";
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
