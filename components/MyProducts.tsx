"use client";
import { Product } from "@/utils/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import Toast from "./Toast";
import { getUserProducts } from "@/utils/actions/products_actions";
import Link from "next/link";
import ProductEditModal from "./ProductEditModal";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "./LoadingSpinner";
import { deleteProduct } from "@/utils/actions/admin_actions";
import { toast } from "react-toastify";

const MyProducts = ({ products: ps, text, adminText }: any) => {
  const { user, error, isLoading } = useUser();
  const [products, setProducts] = useState<Product[]>(ps);
  const [product, setProduct] = useState<Product>({} as Product);
  const [modal, setModal] = useState<boolean>(false);
  const [get, setGet] = useState<boolean>(false);

  const handleEdit = (p: Product) => {
    setProduct(p);
    setModal(true);
  };

  useEffect(() => {
    if (get) {
      getUserProducts(user?.sub as string).then((data) => {
        setProducts(data as Product[]);
        setGet(false);
      });
    }
  }, [get]);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="products">
      <Link href="/add-new-product" className="products-add-new">
        {text.add}
      </Link>
      <Toast />
      {modal && (
        <ProductEditModal
          text={adminText}
          product={product}
          setEdit={setModal}
          setGet={setGet}
        />
      )}
      <div className="products-container">
        {products.map((p: Product) => {
          return (
            <div key={p.id} className="product">
              <h2>{p.name}</h2>
              <div className="product-image">
                <Image src={p.image} alt={p.name} width={500} height={200} />
              </div>
              <p>{p.description}</p>
              <p>{p.price}$</p>
              <div className="my-products-btn-container">
                <button onClick={() => handleEdit(p)}>{text.edit}</button>
                <button
                  onClick={() =>
                    deleteProduct(p.id).then(() => {
                      setGet(true);
                      toast.success("Product deleted successfully");
                    })
                  }
                >
                  {text.delete}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyProducts;
