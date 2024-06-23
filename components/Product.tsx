import { addToCart, setCartTotalCookie } from "@/utils/actions/cart_actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Toast from "./Toast";
import { toast } from "react-toastify";

interface P {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Product = (props: {
  product: P;
  addToCart: string;
  seeMore: string;
  user: { sub: string };
}) => {
  const [product, setProduct] = useState<P | undefined>(undefined);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setProduct(props.product);
    }, 500);

    return () => clearTimeout(timeout);
  }, [props.product]);

  const handleClick = () => {
    if (props.user) {
      addToCart(props.user?.sub as string, props.product.id).then((total) => {
        setCartTotalCookie(total);
      });
    } else {
      toast.error("You need to be logged in to add to cart");
    }
  };

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
      <Toast />
      <h3 className="product-title">{product.name.substring(0, 20)}</h3>
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={170}
        />
      </div>
      <p className="product-price">{product.price}$</p>
      <p className="product-desc">
        {product.description.length > 100
          ? `${product.description.substring(0, 100)}...`
          : product.description}
      </p>
      <div className="product-container">
        <button className="product-btn" onClick={handleClick}>
          {props.addToCart}
        </button>
        <Link className="product-link" href={`/store/${product.id}`}>
          {props.seeMore}
        </Link>
      </div>
    </article>
  );
};

export default Product;
