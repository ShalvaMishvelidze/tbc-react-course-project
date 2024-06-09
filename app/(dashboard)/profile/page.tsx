import Profile from "../../../components/Profile";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const profile: { [key: string]: string } = libraries[language].main.profile;

  return (
    <>
      <Profile profile={profile} />
    </>
  );
};
export default page;
