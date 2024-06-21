import { deleteProduct } from "@/utils/actions/admin_actions";
import Image from "next/image";

const AdminProduct = ({ product, setProduct, setEdit, setDel }: any) => {
  return (
    <div className="admin-product">
      <div className="admin-product-header">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={200}
        />
        <h3>{product.name}</h3>

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
      </div>
      <p>
        {product.description.length > 150
          ? `${product.description.substring(0, 150)}...`
          : product.description}
      </p>
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
