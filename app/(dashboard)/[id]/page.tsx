import { getSystemPreferences } from "../../../utils/actions";
import ImageContainer from "../../../components/ImageContainer";
import AddToCart from "@/components/AddToCart";
import { libraries } from "@/utils/constants";
import { getSingleProduct } from "@/utils/actions/products_actions";
import { Product } from "@/utils/interfaces";
import Reviews from "@/components/Reviews";
import { getSession } from "@auth0/nextjs-auth0";

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { language } = await getSystemPreferences();
  const product: Product = (await getSingleProduct(id)) as Product;
  const session = await getSession();

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
      <Reviews product_id={id} user={session?.user} />
    </section>
  );
};
export default SingleProduct;
