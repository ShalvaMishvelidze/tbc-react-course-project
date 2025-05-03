import Contact from "@/old-components/Contact";
import { getSystemPreferences } from "../../../utils/server_actions";
import { libraries } from "../../../utils/constants";
import LoadingSpinner from "@/old-components/LoadingSpinner";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const contact: { [key: string]: string } = libraries[language].main.contact;

  if (!contact) {
    return <LoadingSpinner />;
  }

  return <Contact contact={contact} />;
};

export default page;
