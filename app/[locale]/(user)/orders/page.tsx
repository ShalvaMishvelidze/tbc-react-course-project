import Orders from "@/pages/Orders";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    return <Orders />;
  },
  { returnTo: "/gallery" }
);
