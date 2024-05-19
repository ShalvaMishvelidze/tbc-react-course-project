import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";

const About = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const about = libraries[language].main.about;

  return <section className="about">{about.heading}</section>;
};

export default About;
