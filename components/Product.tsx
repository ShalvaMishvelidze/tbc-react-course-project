"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// interface P {
//   title: string;
//   price: number;
//   description: string;
//   thumbnail: string;
// }

const Product = (props: { product: any }) => {
  const [product, setProduct] = useState<any>(undefined);

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
      <h5 className="product-title">{product.name.substring(0, 20)}</h5>
      <div className="product-image">
        <Image src={product.image} alt={product.name} width={160} height={90} />
      </div>
      <p className="product-price">{product.price}$</p>
      <p className="product-desc">{product.description.substring(0, 45)}</p>
    </article>
  );
};

export default Product;
