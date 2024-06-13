"use client";
import { Product } from "@/utils/interfaces";
import Image from "next/image";
import { useState } from "react";
import ProductEditModal from "./ProductEditModal";

const MyProducts = ({ products: ps, text }: any) => {
  const [products, setProducts] = useState<Product[]>(ps);
  const [product, setProduct] = useState<Product>({} as Product);
  const [modal, setModal] = useState<boolean>(false);

  const handleEdit = (p: Product) => {
    setProduct(p);
    setModal(true);
  };

  return (
    <div className="products">
      {modal && (
        <ProductEditModal
          product={product}
          setProducts={setProducts}
          setModal={setModal}
          setProduct={setProduct}
          text={text}
        />
      )}
      <div className="products-container">
        {products.map((p: Product) => {
          return (
            <div key={p.id} className="product">
              <h2>{p.name}</h2>
              <div className="product-image">
                <Image src={p.image} alt={p.name} width={200} height={200} />
              </div>
              <p>{p.description}</p>
              <p>{p.price}$</p>
              <div className="btn-container">
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyProducts;
