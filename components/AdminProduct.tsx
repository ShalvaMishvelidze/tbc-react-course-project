import { deleteProduct } from "@/utils/actions/admin_actions";
import Image from "next/image";

const AdminProduct = ({ product, setProduct, setEdit, setDel, text }: any) => {
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
          <h4>
            {text.category}: {product.category}
          </h4>
          <p>
            {text.brand}: {product.brand}
          </p>
          <h4>
            {text.price}: {product.price}$
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
          {text.edit}
        </button>
        <button
          type="button"
          onClick={() => deleteProduct(product.id).then(() => setDel(true))}
        >
          {text.delete}
        </button>
      </div>
    </div>
  );
};
export default AdminProduct;
