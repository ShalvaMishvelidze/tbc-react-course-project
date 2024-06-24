import Admin from "@/components/Admin";
import { getUserRole } from "@/utils/actions/user_actions";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getProducts } from "@/utils/actions/admin_actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getSystemPreferences } from "@/utils/actions";
import { libraries } from "@/utils/constants";

export default withPageAuthRequired(
  async () => {
    const { language } = await getSystemPreferences();
    const session = await getSession();
    const role = await getUserRole(session?.user.sub);
    const products = await getProducts("", 1);
    const text = libraries[language].main.admin;

    if (role !== "admin") {
      return redirect("/");
    }

    if (!products || !text) {
      return <LoadingSpinner />;
    }

    return <Admin products={products} text={text} />;
  },
  { returnTo: "/admin" }
);
