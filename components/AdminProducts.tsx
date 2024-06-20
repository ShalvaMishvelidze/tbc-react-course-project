import {
  getProducts,
  getProductsPageCount,
} from "@/utils/actions/admin_actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageSelector from "./PageSelector";
import { AdminSearch } from "./AdminSearch";
import AdminProduct from "./AdminProduct";
import AdminProductModal from "./AdminProductModal";

const AdminProducts = () => {
  const [products, setProducts] = useState<any>([]);
  const [product, setProduct] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [get, setGet] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  useEffect(() => {
    if (cancel) {
      setEdit(false);
      setCancel(false);
    }
  }, [cancel]);

  useEffect(() => {
    if (searchString) {
      setPage(1);
      setSearch(searchString);
    } else {
      setSearch("");
    }
  }, [searchString]);

  useEffect(() => {
    getProducts(search, page).then((res) => {
      setProducts(res);
    });
  }, [search, page]);

  useEffect(() => {
    if (get) {
      getProducts(search, page).then((res) => {
        setProducts(res);
        setGet(false);
      });
    }
  }, [get]);

  useEffect(() => {
    getProductsPageCount(search).then((count) => {
      setTotalPages(count);
    });
  }, [search]);

  useEffect(() => {
    getProductsPageCount("").then((count) => {
      setTotalPages(count);
    });
  }, []);

  useEffect(() => {
    getProducts(search, 1).then((res) => {
      setProducts(res);
    });
  }, [del]);

  return (
    <>
      {edit && (
        <AdminProductModal
          product={product}
          setCancel={setCancel}
          setGet={setGet}
          setEdit={setEdit}
        />
      )}
      <AdminSearch pageText="search products" page="products" />
      <div className="admin-product-container">
        {products.map((product: any) => {
          return (
            <AdminProduct
              key={product.id}
              product={product}
              setProduct={setProduct}
              setEdit={setEdit}
              setDel={setDel}
            />
          );
        })}
      </div>
      {totalPages > 1 && (
        <PageSelector
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  );
};
export default AdminProducts;
