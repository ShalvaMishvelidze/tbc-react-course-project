import { getUser } from "@/utils/actions/user_actions";
import Profile from "../../../components/Profile";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import LoadingSpinner from "@/components/LoadingSpinner";

export default withPageAuthRequired(
  async () => {
    const { language }: { language: string } = await getSystemPreferences();
    const profile: { [key: string]: string } = libraries[language].main.profile;

    if (!profile) {
      return <LoadingSpinner />;
    }

    const session = await getSession();

    if (!session) {
      return <LoadingSpinner />;
    }

    const user = await getUser(session?.user.sub);

    return <Profile profile={profile} user={user} />;
  },
  { returnTo: "/profile" }
);
