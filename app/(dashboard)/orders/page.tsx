import Orders from "@/components/Orders";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    return <Orders />;
  },
  { returnTo: "/orders" }
);
