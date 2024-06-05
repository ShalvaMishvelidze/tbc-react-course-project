"use server";
import Profile from "@/pages/Profile";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    return <Profile />;
  },
  { returnTo: "/profile" }
);
