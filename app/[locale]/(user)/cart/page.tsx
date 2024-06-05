import Cart from "@/pages/Cart";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    return <Cart />;
  },
  { returnTo: "/gallery" }
);
