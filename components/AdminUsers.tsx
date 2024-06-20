import { getUserPageCount, getUsers } from "@/utils/actions/admin_actions";
import { useEffect, useState } from "react";
import AdminUser from "./AdminUser";
import { AdminSearch } from "./AdminSearch";
import { useSearchParams } from "next/navigation";
import PageSelector from "./PageSelector";

const AdminUsers = () => {
  const [users, setUsers] = useState<any>([]);
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
    getUsers(search, page).then((res) => {
      setUsers(res);
    });
  }, [search, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getUserPageCount(search).then((count) => {
      setTotalPages(count);
    });
  }, [search]);
  useEffect(() => {
    getUserPageCount("").then((count) => {
      setTotalPages(count);
    });
  }, []);

  useEffect(() => {
    getUsers(search, page).then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    if (del) {
      getUsers(search, 1).then((res) => {
        setUsers(res);
        setDel(false);
        setPage(1);
      });
    }
  }, [del]);

  return (
    <>
      <AdminSearch pageText="search users" page="users" />
      <div className="admin-users">
        {users.map((user: any) => {
          return <AdminUser user={user} key={user.id} setDel={setDel} />;
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
export default AdminUsers;
