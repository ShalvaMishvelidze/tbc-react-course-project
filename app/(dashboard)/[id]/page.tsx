import {
  // getProducts,
  getSingleProduct,
  getSystemPreferences,
} from "../../../utils/actions";
import ImageContainer from "../../../components/ImageContainer";
import AddToCart from "@/components/AddToCart";
import { libraries } from "@/utils/constants";

// export const generateStaticParams = async () => {
//   const products: { id: number }[] = await getProducts();

//   return products.map((post) => {
//     return { id: post.id.toString() };
//   });
// };

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { language } = await getSystemPreferences();
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
      <AddToCart
        text={libraries[language].main.products.addToCart}
        product={product}
      />
    </section>
  );
};
export default SingleProduct;
