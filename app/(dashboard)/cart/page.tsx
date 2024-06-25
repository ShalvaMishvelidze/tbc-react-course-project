import Cart from "@/components/Cart";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getSystemPreferences } from "@/utils/actions";
import { getCart } from "@/utils/actions/cart_actions";
import { libraries } from "@/utils/constants";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const session = await getSession();

    if (!session) {
      return <LoadingSpinner />;
    }

    const { language } = await getSystemPreferences();
    const text = libraries[language].main.cart;
    const data = await getCart(session?.user.sub);

    if (!data || !text || !language) {
      return <LoadingSpinner />;
    }

    return <Cart data={data} text={text} />;
  },
  { returnTo: "/cart" }
);
