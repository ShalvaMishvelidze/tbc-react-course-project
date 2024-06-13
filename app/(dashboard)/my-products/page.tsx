import MyProducts from "@/components/MyProducts";
import { getSystemPreferences } from "@/utils/actions";
import { getUserProducts } from "@/utils/actions/products_actions";
import { libraries } from "@/utils/constants";
import { getSession } from "@auth0/nextjs-auth0";

const page = async () => {
  const session = await getSession();
  const products = await getUserProducts(session?.user.sub);
  const { language } = await getSystemPreferences();
  const text = libraries[language].main.addNewProduct;
  return <MyProducts products={products} text={text} />;
};
export default page;
