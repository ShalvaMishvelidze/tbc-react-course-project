import { getSingleProduct, getSystemPreferences } from "../../../utils/actions";
import ImageContainer from "../../../components/ImageContainer";
import AddToCart from "@/components/AddToCart";
import { libraries } from "@/utils/constants";

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { language } = await getSystemPreferences();
  const product: any = await getSingleProduct(id);
  // {
  //   title: string;
  //   price: number;
  //   description: string;
  //   thumbnail: string;
  //   images: string[];
  // }

  return (
    <section className="single-product">
      <h1 className="single-product-title">{product.name}</h1>
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
