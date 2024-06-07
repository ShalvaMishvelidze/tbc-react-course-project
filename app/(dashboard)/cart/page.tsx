import Cart from "@/components/Cart";
import { getSession } from "@auth0/nextjs-auth0";
// import { cookies } from "next/headers";

const page = async () => {
  // const token: any = cookies().get("token");
  const session = await getSession();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL as string}api/cart`,
    {
      method: "GET",
      headers: {
        id: session?.user.sub as string,
        // Authorization: `${token.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return (
    <>
      <Cart data={data} />
    </>
  );
};
export default page;
