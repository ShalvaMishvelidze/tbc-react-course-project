"use client";

import { useState } from "react";
import Image from "next/image";

const ImageContainer = ({
  product,
}: {
  product: {
    name: string;
    image: string;
    images: string[];
  };
}) => {
  const [image, setImage] = useState(product.image);

  return (
    <div className="single-product-container">
      <Image
        src={image}
        alt={product.name}
        className="single-product-img"
        width={420}
        height={350}
      />
      <div className="single-product-img-container">
        <Image
          className={`single-product-img-container-small ${
            image === product.image && "active"
          }`}
          src={product.image}
          alt={product.name}
          width={100}
          height={60}
          onClick={() => setImage(product.image)}
        />
        {product.images.map((img, index) => {
          return (
            <Image
              key={index}
              className={`single-product-img-container-small ${
                image === img && "active"
              }`}
              src={img}
              alt={product.name}
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
