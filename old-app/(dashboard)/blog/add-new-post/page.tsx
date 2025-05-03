import AddNewPost from "@/old-components/AddNewPost";
import LoadingSpinner from "@/old-components/LoadingSpinner";
import { getSystemPreferences } from "@/utils/server_actions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const { language }: { language: string } = await getSystemPreferences();

    if (!language) {
      return <LoadingSpinner />;
    }

    return <AddNewPost language={language} />;
  },
  { returnTo: "/blog/add-new-post" }
);
