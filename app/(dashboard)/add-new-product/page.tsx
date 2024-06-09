import AddNewProduct from "@/components/AddNewProduct";
import { getSystemPreferences } from "@/utils/actions";
import { libraries } from "@/utils/constants";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    const { language } = await getSystemPreferences();
    const text = libraries[language].main.addNewProduct;
    return <AddNewProduct text={text} />;
  },
  { returnTo: "/add-new-product" }
);
