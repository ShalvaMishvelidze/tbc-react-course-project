import AddNewPost from "@/components/AddNewPost";
import { getSystemPreferences } from "@/utils/actions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const { language } = await getSystemPreferences();
    return <AddNewPost language={language} />;
  },
  { returnTo: "/add-new-post" }
);
