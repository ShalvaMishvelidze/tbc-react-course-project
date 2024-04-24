import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";

const About = async () => {
  const { language } = await getSystemPreferences();
  const about = await libraries[language].main.about;

  return <div>{about.heading}</div>;
};

export default About;
