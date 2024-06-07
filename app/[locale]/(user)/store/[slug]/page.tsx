import AddToCart from "@/components/AddToCart";
import ImageContainer from "@/components/ImageContainer";
import React from "react";

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/product/getProduct`,
    { method: "GET", headers: { id: slug } }
  );
  const data = await response.json();
  const product: any = data.data;
  return (
    <section className="single-product">
      <h1 className="single-product-title">{product.name}</h1>
      <ImageContainer product={product} />
      <p className="single-product-price">${product.price}</p>
      <p className="single-product-desc">{product.description}</p>
      <AddToCart text={"add to cart"} product={product} />
    </section>
  );
};

export default page;
