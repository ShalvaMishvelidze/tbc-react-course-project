import { getSingleProduct } from "../../../utils/actions";
import ImageContainer from "@/ImageContainer";

const SingleProduct = async ({ params: { id } }) => {
  const product = await getSingleProduct(id);

  return (
    <section className="single-product">
      <h1 className="single-product-title">{product.title}</h1>
      <ImageContainer product={product} />
      <p className="single-product-price">${product.price}</p>
      <p className="single-product-desc">{product.description}</p>
    </section>
  );
};
export default SingleProduct;
