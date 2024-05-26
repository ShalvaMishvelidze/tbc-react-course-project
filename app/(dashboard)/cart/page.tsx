import Cart from "@/components/Cart";
import { cookies } from "next/headers";

const page = async () => {
  const token: any = cookies().get("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL as string}api/cart`, {
    method: "GET",
    headers: {
      Authorization: `${token.value}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return (
    <>
      <Cart data={data} />
    </>
  );
};
export default page;
