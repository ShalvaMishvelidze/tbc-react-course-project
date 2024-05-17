"use client";

const AddToCart = ({ text, product }: { text: string; product: any }) => {
  const addProduct = async () => {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ product_id: 93, quantity: 1 }),
    });
  };

  return (
    <button
      className="cart-btn"
      onClick={() => {
        addProduct();
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
