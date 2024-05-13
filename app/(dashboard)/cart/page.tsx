import Cart from "@/components/Cart";
import { CartProvider } from "@/context/cart_context";

const page = () => {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
};
export default page;
