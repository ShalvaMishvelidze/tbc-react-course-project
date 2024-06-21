"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import Toast from "./Toast";
import { toast } from "react-toastify";

const AddNewProduct = ({ text }: any) => {
  const { user, error, isLoading } = useUser();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputImagesRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState<any>({
    name: "",
    price: "",
    category: "",
    brand: "",
    discountpercentage: "",
    description: "",
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
    if (!product.name) {
      toast.error("You need to enter a name!");
      return;
    }
    if (!product.price) {
      toast.error("You need to enter a price!");
      return;
    }
    if (!product.category) {
      toast.error("You need to enter a category!");
      return;
    }
    if (!product.brand) {
      toast.error("You need to enter a brand!");
      return;
    }
    if (!product.discountpercentage) {
      toast.error("You need to enter a discount percentage!");
      return;
    }
    if (!product.description) {
      toast.error("You need to enter a description!");
      return;
    }
    if (!image.name) {
      toast.error("You need to select a main image!");
      return;
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

    toast.success("Product added successfully!");
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
    if (e.target.files![0].size > 1024 * 1024) {
      inputImageRef.current!.value = "";
      inputImagesRef.current!.value = "";
      toast.error(
        "Image size is too big! You can only upload images up to 1MB."
      );
      return;
    } else if (e.target && e.target.dataset.type === "image") {
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
    } else if (e.target && e.target.dataset.type === "images") {
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
      <Toast />
      <div className="new-product-form">
        <div>
          <label className="new-product-label">{text.name}:</label>
          <input
            onChange={handleChange}
            className="new-product-input"
            type="text"
            id="name"
            required
            data-type="name"
            value={product.name}
            maxLength={100}
          />
        </div>
        <div>
          <label className="new-product-label">{text.price}:</label>
          <input
            onChange={(e) => {
              const regex = /^\d*\.?\d*$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                if (e.target.value === "." || e.target.value === "0") {
                  setProduct({ ...product, price: "1" });
                } else if (parseFloat(e.target.value) > 1000000000) {
                  setProduct({ ...product, price: "1000000000" });
                } else {
                  setProduct({ ...product, price: e.target.value });
                }
              }
            }}
            className="new-product-input"
            type="text"
            data-type="price"
            id="price"
            required
            value={product.price}
            maxLength={10}
          />
        </div>
        <div>
          <label className="new-product-label">
            {text.discountpercentage}:
          </label>
          <input
            onChange={(e) => {
              const regex = /^(?!0\d)\d*$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                setProduct({
                  ...product,
                  discountpercentage: e.target.value,
                });
              }
            }}
            className="new-product-input"
            type="text"
            maxLength={2}
            data-type="discountpercentage"
            id="discount"
            required
            value={product.discountpercentage}
          />
        </div>
        <div>
          <label className="new-product-label">{text.category}:</label>
          <input
            onChange={handleChange}
            className="new-product-input"
            type="text"
            id="category"
            required
            value={product.category}
            data-type="category"
            maxLength={50}
          />
        </div>
        <div>
          <label className="new-product-label">{text.brand}:</label>
          <input
            onChange={handleChange}
            className="new-product-input"
            type="text"
            id="brand"
            data-type="brand"
            required
            value={product.brand}
            maxLength={50}
          />
        </div>
        <div>
          <label className="new-product-label">{text.description}:</label>
          <textarea
            onChange={handleChange}
            className="new-product-textarea"
            id="description"
            data-type="description"
            rows={4}
            cols={60}
            required
            value={product.description}
            maxLength={1000}
          ></textarea>
        </div>
      </div>

      <div className="new-product-images">
        <div className="image-container">
          <label className="new-product-label" htmlFor="image">
            {text.image}
          </label>
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
        </div>
        <div className="images-container">
          <label className="new-product-label" htmlFor="images">
            {text.images}
          </label>
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
        </div>
      </div>
      <button type="submit" className="new-product-btn" onClick={handleSubmit}>
        {text.addProduct}
      </button>
    </section>
  );
};

export default AddNewProduct;
