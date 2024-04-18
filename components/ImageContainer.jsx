"use client";

import { useState } from "react";
import Image from "next/image";

const ImageContainer = ({ product }) => {
  const [image, setImage] = useState(product.thumbnail);

  return (
    <div className="single-product-container">
      <Image
        src={image}
        alt={product.title}
        className="single-product-img"
        width={420}
        height={350}
      />
      <div className="single-product-img-container">
        {product.images.map((img, index) => {
          return (
            <Image
              key={index}
              className={`single-product-img-container-small ${
                image === img && "active"
              }`}
              src={img}
              alt={product.title}
              width={100}
              height={60}
              onClick={() => setImage(img)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ImageContainer;
