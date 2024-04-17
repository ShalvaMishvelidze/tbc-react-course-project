"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const { PRODUCTS_API_URL } = require("../../../utils/constants");

const SingleProduct = ({ params: { id } }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${PRODUCTS_API_URL}/${id}`);
      const data = await response.json();
      setProduct(data);
      setImage(data.thumbnail);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="single-product">loading...</div>;
  }

  return (
    <section className="single-product">
      <h1 className="single-product-title">{product.title}</h1>
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
      <p className="single-product-price">${product.price}</p>
      <p className="single-product-desc">{product.description}</p>
    </section>
  );
};
export default SingleProduct;
