"use client";

// import { setCartTotalCookie } from "@/utils/actions";
// import { useUser } from "@auth0/nextjs-auth0/client";

const AddToCart = ({
  text,
}: // , product
{
  text: string;
  // ; product: any
}) => {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // const addProduct = async () => {
  //   const response = await fetch("/api/cart", {
  //     method: "POST",
  //     headers: { id: user?.sub as string, "Content-Type": "application/json" },
  //     body: JSON.stringify({ product_id: product.id }),
  //   });
  //   const data = await response.json();
  //   // await setCartTotalCookie(data.quantity);
  // };

  return (
    <button
      className="cart-btn"
      // onClick={() => {
      //   addProduct();
      // }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
