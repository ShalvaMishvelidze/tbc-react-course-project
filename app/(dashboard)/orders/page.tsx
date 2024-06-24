import LoadingSpinner from "@/components/LoadingSpinner";
import Orders from "@/components/Orders";
import { getSystemPreferences } from "@/utils/actions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const { language } = await getSystemPreferences();

    if (!language) {
      return <LoadingSpinner />;
    }

    return <Orders language={language} />;
  },
  { returnTo: "/orders" }
);
