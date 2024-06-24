import { getSystemPreferences } from "../../../../utils/actions";
import ImageContainer from "../../../../components/ImageContainer";
import AddToCart from "@/components/AddToCart";
import { libraries } from "@/utils/constants";
import { getSingleProduct } from "@/utils/actions/products_actions";
import { Product } from "@/utils/interfaces";
import Reviews from "@/components/Reviews";
import Ratings from "@/components/Ratings";
import LoadingSpinner from "@/components/LoadingSpinner";

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { language } = await getSystemPreferences();

  if (!language) {
    return <LoadingSpinner />;
  }

  const product: Product = (await getSingleProduct(id)) as Product;

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <section className="single-product">
      <ImageContainer product={product} />
      <div className="single-product-container">
        <h1 className="single-product-title">{product.name}</h1>
        <p className="single-product-price">${product.price}</p>
        <Ratings product_id={+id} rating={product.rating} />
        <p className="single-product-desc">{product.description}</p>
        <AddToCart
          text={libraries[language].main.products.addToCart}
          product={product}
        />
      </div>
      <Reviews text={libraries[language].main.products} product_id={id} />
    </section>
  );
};
export default SingleProduct;
