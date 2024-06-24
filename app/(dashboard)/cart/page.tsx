import Cart from "@/components/Cart";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getCart } from "@/utils/actions/cart_actions";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const session = await getSession();

    if (!session) {
      return <LoadingSpinner />;
    }

    const data = await getCart(session?.user.sub);

    if (!data) {
      return <LoadingSpinner />;
    }

    return <Cart data={data} />;
  },
  { returnTo: "/cart" }
);
