import Profile from "../../../components/Profile";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const { language }: { language: string } = await getSystemPreferences();
    const profile: { [key: string]: string } = libraries[language].main.profile;

    return <Profile profile={profile} />;
  },
  { returnTo: "/profile" }
);
