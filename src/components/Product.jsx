import React from "react";

const Product = ({
  product: { title, description, thumbnail: img, price },
}) => {
  return (
    <article className="product">
      <h6 className="product-title">{title}</h6>
      <div className="product-img">
        <img src={img} alt={title} />
        <button className="cart-btn">add to cart</button>
      </div>
      <p className="product-price">{price}$</p>
      <p className="product-desc">{description.substring(0, 45)}</p>
    </article>
  );
};

export default Product;
