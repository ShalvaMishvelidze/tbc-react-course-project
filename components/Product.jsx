import Image from "next/image";
import React, { useEffect, useState } from "react";

const Product = (props) => {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  if (!product) {
    return <div className="loading">loading...</div>;
  }

  return (
    <article className="product">
      <h5 className="product-title">{product.title}</h5>
      <div className="product-img">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={160}
          height={90}
        />
        <button className="cart-btn">add to cart</button>
      </div>
      <p className="product-price">{product.price}$</p>
      <p className="product-desc">{product.description.substring(0, 45)}</p>
    </article>
  );
};

export default Product;
