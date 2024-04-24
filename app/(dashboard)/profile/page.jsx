import Profile from "../../../sass/components/Profile";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";

const page = async () => {
  const { language } = await getSystemPreferences();
  const profile = await libraries[language].main.profile;

  return (
    <>
      <Profile profile={profile} />
    </>
  );
};
export default page;
