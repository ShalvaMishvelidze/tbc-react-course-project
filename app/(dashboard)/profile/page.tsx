import { getUser } from "@/utils/actions/user_actions";
import Profile from "../../../components/Profile";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const { language }: { language: string } = await getSystemPreferences();
    const profile: { [key: string]: string } = libraries[language].main.profile;
    const session = await getSession();
    const user = await getUser(session?.user.sub);

    return <Profile profile={profile} user={user} />;
  },
  { returnTo: "/profile" }
);
