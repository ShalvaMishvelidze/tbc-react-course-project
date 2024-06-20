import Cart from "@/components/Cart";
import { getCart } from "@/utils/actions/cart_actions";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    const session = await getSession();

    const data = await getCart(session?.user.sub);

    return <Cart data={data} />;
  },
  { returnTo: "/cart" }
);
