"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { Product } from "@/utils/interfaces";
import { deleteImage, editProduct } from "@/utils/actions/products_actions";

const ProductEditModal = ({
  product: p,
  setModal,
  setProduct: setGlobalProduct,
  setProducts,
  text,
}: {
  product: Product;
  setModal: any;
  setProduct: any;
  setProducts: any;
  text: any;
}) => {
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   // await updateProduct(product);
  //   setModal(false);
  //   setProduct({} as Product);
  //   setProducts((prev: Product[]) => {
  //     const index = prev.findIndex((p) => p.id === product.id);
  //     prev[index] = product;
  //     return [...prev];
  //   });
  // };
  const mainImage = p.image;
  const { user, error, isLoading } = useUser();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputImagesRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState<Product>({ ...p });

  const [image, setImage] = useState<any>({});
  const [images, setImages] = useState<any[]>([]);
  const [delImages, setDelImages] = useState<string[]>([]);
  const [keepImages, setKeepImages] = useState<string[]>([...p.images]);

  if (isLoading) {
    return <div className="loading">loading</div>;
  }

  if (error) {
    return <div className="error">error</div>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (user?.sub !== product.owner_id) {
      return;
    }

    if (image.name) {
      await deleteImage(mainImage);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/image/upload?filename=${image.name}`,
        {
          method: "POST",
          body: image,
        }
      );
      const imageBlob = await res.json();
      const imageBlobUrl = imageBlob.url;
      setProduct({ ...product, image: imageBlobUrl });
    }

    if (images.length !== 0) {
      await Promise.all(
        delImages.map(async (img) => {
          console.log("cick 2");
          await deleteImage(img);
          return;
        })
      );
      const imageBlobs = await Promise.all(
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
      setProduct({ ...product, images: [...keepImages, ...imageBlobs] });
    }

    await editProduct(product);
    setProducts((prev: Product[]) => {
      const index = prev.findIndex((p: Product) => p.id === product.id);
      prev[index] = product;
      return [...prev];
    });
    setModal(false);
    setGlobalProduct({} as Product);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProduct((prevState: Product) => ({
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
              setProduct({ ...product, image: e.target.result as string });
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
                images: newImages as string[],
              });
            }
          };
          reader.readAsDataURL(file);
          setImages([...images, files[0]]);
        }
      }
    }
  };

  const handleDelete = (url: string) => {
    setKeepImages((prevKeepImages) => {
      return [...prevKeepImages.filter((image) => image !== url)];
    });
    setDelImages((prevDelImages) => [...prevDelImages, url]);
  };

  return (
    <section className="edit-product">
      <button onClick={handleSubmit}>cick</button>
      <form>
        <label className="edit-product-label">{text.name}:</label>
        <input
          onChange={handleChange}
          className="edit-product-input"
          type="text"
          id="name"
          required
          data-type="name"
          value={product.name}
        />

        <label className="edit-product-label">{text.price}:</label>
        <input
          onChange={handleChange}
          className="edit-product-input"
          type="number"
          data-type="price"
          id="price"
          required
          value={product.price}
        />

        <label className="edit-product-label">{text.category}:</label>
        <input
          onChange={handleChange}
          className="edit-product-input"
          type="text"
          id="category"
          required
          value={product.category}
          data-type="category"
        />

        <label className="edit-product-label">{text.brand}:</label>
        <input
          onChange={handleChange}
          className="edit-product-input"
          type="text"
          id="brand"
          data-type="brand"
          required
          value={product.brand}
        />

        <label className="edit-product-label">
          {" "}
          {text.discountpercentage}:
        </label>
        <input
          onChange={(e) => {
            if (e.target.value.length > 2) {
              setProduct({
                ...product,
                discountpercentage: 99,
              });
            } else {
              handleChange(e);
            }
          }}
          className="edit-product-input"
          type="number"
          data-type="discountpercentage"
          id="discount"
          required
          value={product.discountpercentage}
        />

        <label className="edit-product-label">{text.description}:</label>
        <textarea
          onChange={handleChange}
          className="edit-product-textarea"
          id="description"
          data-type="description"
          rows={4}
          cols={60}
          required
          value={product.description}
        ></textarea>

        <label className="edit-product-label">{text.image}:</label>
        <input
          onChange={handleImageChange}
          className="edit-product-input"
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

        <label className="edit-product-label">{text.images}:</label>
        <input
          onChange={handleImageChange}
          className="edit-product-input"
          type="file"
          id="images"
          data-type="images"
          accept="image/*"
          ref={inputImagesRef}
          multiple
        />
        {product.images.length !== 0 &&
          product.images.map((img: string, index: number) => {
            return (
              <div className="image-container" key={index}>
                <Image src={img} width={100} height={100} alt="product-image" />
                <button
                  onClick={() => {
                    handleDelete(img);
                    setProduct({
                      ...product,
                      images: product.images.filter(
                        (_: string, i: number) => i !== index
                      ),
                    });
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}

        <button type="submit" className="edit-product-btn">
          {text.addProduct}
        </button>
      </form>
    </section>
  );
};

export default ProductEditModal;
