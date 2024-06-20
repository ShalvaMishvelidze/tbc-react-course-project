import Success from "@/components/Success";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async () => {
    return <Success />;
  },
  { returnTo: "/success" }
);
