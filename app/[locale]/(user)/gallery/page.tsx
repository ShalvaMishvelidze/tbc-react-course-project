import Gallery from "@/pages/Gallery";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    return <Gallery />;
  },
  { returnTo: "/gallery" }
);
