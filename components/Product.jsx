import Image from "next/image";
import React from "react";

const Product = ({
  product: { title, description, thumbnail: img, price },
}) => {
  return (
    <article className="product">
      <h5 className="product-title">{title}</h5>
      <div className="product-img">
        <Image src={img} alt={title} width={160} height={90} />
        <button className="cart-btn">add to cart</button>
      </div>
      <p className="product-price">{price}$</p>
      <p className="product-desc">{description.substring(0, 45)}</p>
    </article>
  );
};

export default Product;
