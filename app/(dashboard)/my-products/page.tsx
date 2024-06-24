import LoadingSpinner from "@/components/LoadingSpinner";
import MyProducts from "@/components/MyProducts";
import { getSystemPreferences } from "@/utils/actions";
import { getUserProducts } from "@/utils/actions/products_actions";
import { libraries } from "@/utils/constants";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const session = await getSession();

    if (!session) {
      return <LoadingSpinner />;
    }

    const products = await getUserProducts(session?.user.sub);

    if (!products) {
      return <LoadingSpinner />;
    }

    const { language } = await getSystemPreferences();
    const text = libraries[language].main.myProducts;
    const adminText = libraries[language].main.admin;

    if (!text || !adminText) {
      return <LoadingSpinner />;
    }

    return <MyProducts products={products} text={text} adminText={adminText} />;
  },
  { returnTo: "/my-products" }
);
