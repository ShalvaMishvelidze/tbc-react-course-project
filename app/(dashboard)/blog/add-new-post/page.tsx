import AddNewPost from "@/components/AddNewPost";
import { getSystemPreferences } from "@/utils/actions";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();

  return <AddNewPost language={language} />;
};

export default page;
