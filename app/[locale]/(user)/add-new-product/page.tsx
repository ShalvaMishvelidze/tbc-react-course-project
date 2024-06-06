import AddNewProduct from "@/components/AddNewProduct";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function page() {
    return <AddNewProduct />;
  },
  { returnTo: "/add-new-product" }
);
