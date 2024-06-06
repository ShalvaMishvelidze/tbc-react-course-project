"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const AddNewProduct = () => {
  const t = useTranslations("addNewProduct");
  const { user, error, isLoading } = useUser();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputImagesRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState<any>({
    name: "test",
    price: "20",
    category: "testing",
    brand: "test brand",
    discountpercentage: "12",
    description: "this is a test",
    image: "",
    images: [],
  });

  const [image, setImage] = useState<any>({});
  const [images, setImages] = useState<any[]>([]);

  if (isLoading) {
    return <div className="loading">loading</div>;
  }

  if (error) {
    return <div className="error">error</div>;
  }

  const handleSubmit = async () => {
    if (!inputImageRef.current?.files) {
      throw new Error("No file selected");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/image/upload?filename=${image.name}`,
      {
        method: "POST",
        body: image,
      }
    );
    const imageBlob = await res.json();
    const imageBlobUrl = imageBlob.url;
    let imageBlobs;

    if (images.length !== 0) {
      imageBlobs = await Promise.all(
        images.map(async (img) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}api/image/upload?filename=${img.name}`,
            {
              method: "POST",
              body: img,
            }
          );
          const data = await res.json();
          return data.url;
        })
      );
    }

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/upload`, {
      method: "POST",
      headers: { id: user?.sub as string },
      body: JSON.stringify({
        ...product,
        image: imageBlobUrl,
        images: imageBlobs ? imageBlobs : [],
      }),
    });

    // await fetch(`/api/image/upload`, {
    //   method: "POST",
    //   headers: { id: user?.sub as string },
    //   body: formData,
    // });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProduct((prevState: any) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.dataset.type === "image") {
      const files = e.target.files;
      if (files !== null) {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            if (e.target) {
              setProduct({ ...product, image: e.target.result });
            }
          };
          reader.readAsDataURL(file);
        }
        setImage(files[0]);
      }
    }
    if (e.target && e.target.dataset.type === "images") {
      const files = e.target.files;
      if (files !== null) {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            if (e.target) {
              let newImages = [...product.images, e.target.result];
              if (newImages.length > 5) {
                newImages = [...newImages.slice(1)];
              }
              setProduct({
                ...product,
                images: newImages,
              });
            }
          };
          reader.readAsDataURL(file);
          setImages([...images, files[0]]);
        }
      }
    }
  };

  return (
    <section className="new-product">
      <button onClick={handleSubmit}>cick</button>
      <form>
        <label className="new-product-label">{t("name")}:</label>
        <input
          onChange={handleChange}
          className="new-product-input"
          type="text"
          id="name"
          required
          data-type="name"
          value={product.name}
        />

        <label className="new-product-label">{t("price")}:</label>
        <input
          onChange={handleChange}
          className="new-product-input"
          type="number"
          data-type="price"
          id="price"
          required
          value={product.price}
        />

        <label className="new-product-label">{t("category")}:</label>
        <input
          onChange={handleChange}
          className="new-product-input"
          type="text"
          id="category"
          required
          value={product.category}
          data-type="category"
        />

        <label className="new-product-label">{t("brand")}:</label>
        <input
          onChange={handleChange}
          className="new-product-input"
          type="text"
          id="brand"
          data-type="brand"
          required
          value={product.brand}
        />

        <label className="new-product-label"> {t("discountpercentage")}:</label>
        <input
          onChange={handleChange}
          className="new-product-input"
          type="number"
          data-type="discountpercentage"
          id="discount"
          required
          value={product.discountpercentage}
        />

        <label className="new-product-label">{t("description")}:</label>
        <textarea
          onChange={handleChange}
          className="new-product-textarea"
          id="description"
          data-type="description"
          rows={4}
          cols={60}
          required
          value={product.description}
        ></textarea>

        <label className="new-product-label">{t("image")}:</label>
        <input
          onChange={handleImageChange}
          className="new-product-input"
          type="file"
          data-type="image"
          id="image"
          accept="image/*"
          ref={inputImageRef}
          required
        />
        {product.image && (
          <Image
            src={product.image}
            width={100}
            height={100}
            alt="product-image"
          />
        )}

        <label className="new-product-label">{t("images")}:</label>
        <input
          onChange={handleImageChange}
          className="new-product-input"
          type="file"
          id="images"
          data-type="images"
          accept="image/*"
          ref={inputImagesRef}
          multiple
        />
        {product.images.length !== 0 &&
          product.images.map((img: any, index: number) => {
            return (
              <Image
                key={index}
                src={img}
                width={100}
                height={100}
                alt="product-image"
              />
            );
          })}

        <button type="submit" className="new-product-btn">
          {t("addProduct")}
        </button>
      </form>
    </section>
  );
};

export default AddNewProduct;
