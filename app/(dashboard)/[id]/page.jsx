import { getProducts, getSingleProduct } from "../../../utils/actions";
import ImageContainer from "@/ImageContainer";

export const generateStaticParams = async () => {
  const product = await getProducts();

  return product.map((post) => {
    return { id: post.id.toString() };
  });
};

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
