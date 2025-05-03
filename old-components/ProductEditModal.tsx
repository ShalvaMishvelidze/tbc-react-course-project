"use client";
import { editProduct } from "@/utils/actions/admin_actions";
import { deleteImage } from "@/utils/actions/products_actions";
import { Product } from "@/utils/interfaces";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

const ProductEditModal = ({ product: p, setEdit, setGet, text }: any) => {
  const mainImage = p.image;
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputImagesRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState<Product>({ ...p });

  const [image, setImage] = useState<any>({});
  const [images, setImages] = useState<any[]>([]);
  const [delImages, setDelImages] = useState<string[]>([]);
  const [keepImages, setKeepImages] = useState<string[]>([...p.images]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    toast.info("saving product...");

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
    toast.success("product saved");
    setGet(true);
    setEdit(false);
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
    if (e.target.files![0].size > 1024 * 1024) {
      inputImageRef.current!.value = "";
      inputImagesRef.current!.value = "";
      toast.error(
        "Image size is too big! You can only upload images up to 1MB."
      );
      return;
    }
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
    <div className="admin-products-modal">
      <div className="admin-products-modal-container">
        <div className="input-container">
          <div>
            <label className="admin-products-modal-label">{text.name}:</label>
            <input
              onChange={handleChange}
              className="admin-products-modal-input"
              type="text"
              id="name"
              required
              data-type="name"
              value={product.name}
            />
          </div>

          <div>
            <label className="admin-products-modal-label">{text.price}:</label>
            <input
              onChange={(e) => {
                if (e.target.value.length > 6) {
                  setProduct({
                    ...product,
                    price: 999999,
                  });
                } else {
                  handleChange(e);
                }
              }}
              className="admin-products-modal-input"
              type="number"
              data-type="price"
              id="price"
              required
              value={product.price}
            />
          </div>

          <div>
            <label className="admin-products-modal-label">
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
              className="admin-products-modal-input"
              type="number"
              data-type="discountpercentage"
              id="discount"
              required
              value={product.discountpercentage}
            />
          </div>
          <div>
            <label className="admin-products-modal-label">
              {text.category}:
            </label>
            <input
              onChange={handleChange}
              className="admin-products-modal-input"
              type="text"
              id="category"
              required
              value={product.category}
              data-type="category"
            />
          </div>

          <div>
            <label className="admin-products-modal-label">{text.brand}:</label>
            <input
              onChange={handleChange}
              className="admin-products-modal-input"
              type="text"
              id="brand"
              data-type="brand"
              required
              value={product.brand}
            />
          </div>
          <div>
            <label className="admin-products-modal-label">
              {text.description}:
            </label>
            <textarea
              onChange={handleChange}
              className="admin-products-modal-textarea"
              id="description"
              data-type="description"
              rows={4}
              cols={60}
              required
              value={product.description}
            ></textarea>
          </div>
        </div>

        <div className="admin-products-modal-images">
          <div className="image-container">
            {product.image && (
              <Image
                src={product.image}
                width={100}
                height={100}
                alt="product-image"
              />
            )}
            <label className="admin-products-modal-label" htmlFor="image">
              {text.changeImage}
            </label>
            <input
              onChange={handleImageChange}
              className="admin-products-modal-input"
              type="file"
              data-type="image"
              id="image"
              accept="image/*"
              ref={inputImageRef}
              required
            />
          </div>

          <div className="images-container">
            <div className="images-container-input">
              <label className="admin-products-modal-label" htmlFor="images">
                {text.images}
              </label>
              <input
                onChange={handleImageChange}
                className="admin-products-modal-input"
                type="file"
                id="images"
                data-type="images"
                accept="image/*"
                ref={inputImagesRef}
                multiple
              />
            </div>
            <div className="images-container-images">
              {product.images.length !== 0 &&
                product.images.map((img: string, index: number) => {
                  return (
                    <div className="container" key={index}>
                      <Image
                        src={img}
                        width={100}
                        height={100}
                        alt="product-image"
                      />
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
                        x
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="admin-products-modal-btn-container">
          <button onClick={handleSubmit}>{text.save}</button>
          <button onClick={() => setEdit(false)}>{text.cancel}</button>
        </div>
      </div>
    </div>
  );
};
export default ProductEditModal;
