import Cart from "@/pages/Cart";
import { getCart } from "@/utils/cart_actions";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    const session = await getSession();
    const products = await getCart(session?.user.sub as string);
    return <Cart products={products} />;
  },
  { returnTo: "/gallery" }
);
