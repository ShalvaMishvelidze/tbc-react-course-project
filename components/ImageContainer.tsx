"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/utils/interfaces";

const ImageContainer = ({ product }: { product: Product }) => {
  const [image, setImage] = useState(product.image);

  return (
    <div className="single-product-images">
      <Image
        src={image}
        alt={product.name}
        className="single-product-images-img"
        width={600}
        height={400}
      />
      <div className="single-product-images-container">
        <Image
          className={`single-product-images-img-small ${
            image === product.image && "active"
          }`}
          src={product.image}
          alt={product.name}
          width={90}
          height={90}
          onClick={() => setImage(product.image)}
        />
        {product.images.map((img: any, index: number) => {
          return (
            <Image
              key={index}
              className={`single-product-images-img-small ${
                image === img && "active"
              }`}
              src={img}
              alt={product.name}
              width={90}
              height={90}
              onClick={() => setImage(img)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ImageContainer;
