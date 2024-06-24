import { getOrdersPageCount, getOrders } from "@/utils/actions/admin_actions";
import { useEffect, useState } from "react";
import AdminOrder from "./AdminOrder";
import { AdminSearch } from "./AdminSearch";
import { useSearchParams } from "next/navigation";
import PageSelector from "./PageSelector";

const AdminOrders = ({ text }: any) => {
  const [orders, setOrders] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [del, setDel] = useState(false);

  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  useEffect(() => {
    if (searchString) {
      setPage(1);
      setSearch(searchString);
    }
  }, [searchString]);

  useEffect(() => {
    getOrders(search, page).then((res) => {
      setOrders(res);
    });
  }, [search, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getOrdersPageCount(search).then((count) => {
      setTotalPages(count);
    });
  }, [search]);

  useEffect(() => {
    getOrdersPageCount("").then((count) => {
      setTotalPages(count);
    });
  }, []);

  useEffect(() => {
    getOrders(search, page).then((res) => {
      setOrders(res);
    });
  }, []);

  useEffect(() => {
    if (del) {
      getOrders(search, 1).then((res) => {
        setOrders(res);
        setDel(false);
        setPage(1);
      });
    }
  }, [del]);

  return (
    <>
      <AdminSearch pageText={text.placeholder} page="orders" />
      <div className="admin-orders">
        {orders.map((order: any) => {
          return (
            <AdminOrder
              order={order}
              key={order.order_id}
              setDel={setDel}
              text={text.refund}
            />
          );
        })}
      </div>
      {totalPages > 1 && (
        <PageSelector
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
export default AdminOrders;
