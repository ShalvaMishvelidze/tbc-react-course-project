import { getSystemPreferences } from "../../../../utils/actions";
import ImageContainer from "../../../../components/ImageContainer";
import AddToCart from "@/components/AddToCart";
import { libraries } from "@/utils/constants";
import { getSingleProduct } from "@/utils/actions/products_actions";
import { Product } from "@/utils/interfaces";
import Reviews from "@/components/Reviews";
import Ratings from "@/components/Ratings";
import LoadingSpinner from "@/components/LoadingSpinner";
import Head from "next/head";

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

  const pageTitle = `${product.name} - $${product.price}`;
  const pageDescription = product.description;
  const pageImage = product.image; // Ensure this is an absolute URL

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="product" />
        {/* <meta property="og:url" content={url} /> */}

        {/* X (Twitter) Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* Add additional meta tags for other social media platforms as needed */}
      </Head>
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
    </>
  );
};
export default SingleProduct;
