import Image from "next/image";
import React, { useEffect, useState } from "react";

const Product = (props) => {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setProduct(props.product);
    }, 1800);

    return () => clearTimeout(timeout);
  }, [props.product]);

  if (!product) {
    return (
      <article className="product loading">
        <div className="product-title"></div>
        <div className="product-img"></div>
        <div className="product-price"></div>
        <div className="product-desc"></div>
      </article>
    );
  }

  return (
    <article className="product">
      <h5 className="product-title">{product.title.substring(0, 20)}</h5>
      <div className="product-img">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={160}
          height={90}
        />
        <button className="cart-btn">{props.addToCart}</button>
      </div>
      <p className="product-price">{product.price}$</p>
      <p className="product-desc">{product.description.substring(0, 45)}</p>
    </article>
  );
};

export default Product;
