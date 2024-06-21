import Contact from "@/components/Contact";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const contact: { [key: string]: string } = libraries[language].main.contact;

  return <Contact contact={contact} />;
};

export default page;
