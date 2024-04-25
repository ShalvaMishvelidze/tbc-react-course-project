import { getProducts, getSingleProduct } from "../../../utils/actions";
import ImageContainer from "../../../components/ImageContainer";

export const generateStaticParams = async () => {
  const products: { id: number }[] = await getProducts("");

  return products.map((post) => {
    return { id: post.id.toString() };
  });
};

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product: {
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    images: string[];
  } = await getSingleProduct(id);

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
