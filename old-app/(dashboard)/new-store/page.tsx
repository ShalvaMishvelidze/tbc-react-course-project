import LoadingSpinner from "@/old-components/LoadingSpinner";
import { getSystemPreferences } from "@/utils/server_actions";
import { Products as Type } from "@/utils/interfaces";
import { libraries } from "@/utils/constants";
import NewProducts from "@/old-components/NewProducts";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();

  const pageText: Type = libraries[language].main.products;
  if (!language || !pageText) {
    return <LoadingSpinner />;
  }

  return <NewProducts pageText={pageText} />;
};
export default page;
