import { getSystemPreferences } from "../../../../utils/actions";
import ImageContainer from "../../../../components/ImageContainer";
import AddToCart from "@/components/AddToCart";
import { libraries } from "@/utils/constants";
import { getSingleProduct } from "@/utils/actions/products_actions";
import { Product } from "@/utils/interfaces";
import Reviews from "@/components/Reviews";
import { getSession } from "@auth0/nextjs-auth0";
import Ratings from "@/components/Ratings";
import { getUserRole } from "@/utils/actions/user_actions";

const SingleProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { language } = await getSystemPreferences();
  const product: Product = (await getSingleProduct(id)) as Product;
  const session = await getSession();
  const role = await getUserRole(session?.user.sub as string);

  return (
    <section className="single-product">
      <ImageContainer product={product} />
      <div className="single-product-container">
        <h1 className="single-product-title">{product.name}</h1>
        <p className="single-product-price">${product.price}</p>
        {session?.user && (
          <Ratings
            product_id={+id}
            owner_id={session?.user.sub}
            rating={product.rating}
          />
        )}
        <p className="single-product-desc">{product.description}</p>
        <AddToCart
          text={libraries[language].main.products.addToCart}
          product={product}
          user={session?.user as { sub: string }}
        />
      </div>
      <Reviews
        text={libraries[language].main.products}
        product_id={id}
        user={session?.user}
        role={role}
      />
    </section>
  );
};
export default SingleProduct;
