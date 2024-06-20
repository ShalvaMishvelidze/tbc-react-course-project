import { deleteProduct } from "@/utils/actions/admin_actions";
import Image from "next/image";

const AdminProduct = ({ product, setProduct, setEdit, setDel }: any) => {
  return (
    <div className="admin-product">
      <Image src={product.image} alt={product.name} width={100} height={100} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="admin-product-info">
        <h4>category: {product.category}</h4>
        <p>brand: {product.brand}</p>
        <h4>
          price:{" "}
          {Math.ceil(
            product.price - (product.price * product.discountpercentage) / 100
          )}
          $
        </h4>
      </div>
      <div className="admin-product-btns">
        <button
          type="button"
          onClick={() => {
            setProduct(product);
            setEdit(true);
          }}
        >
          edit
        </button>
        <button
          type="button"
          onClick={() => deleteProduct(product.id).then(() => setDel(true))}
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default AdminProduct;
