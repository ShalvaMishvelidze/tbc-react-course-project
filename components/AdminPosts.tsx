import { getPostPageCount, getPosts } from "@/utils/actions/admin_actions";
import { useEffect, useState } from "react";
import { AdminSearch } from "./AdminSearch";
import { useSearchParams } from "next/navigation";
import PageSelector from "./PageSelector";
import AdminPost from "./AdminPost";
import AdminPostModal from "./AdminPostModal";

const AdminPosts = ({ text }: any) => {
  const [post, setPost] = useState<any>({});
  const [posts, setPosts] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [get, setGet] = useState(false);

  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  useEffect(() => {
    if (get) {
      getPosts(search, page).then((res) => {
        setPosts(res);
        setGet(false);
      });
    }
  }, [get]);

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
    getPosts(search, page).then((res) => {
      setPosts(res);
    });
  }, [search, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getPostPageCount(search).then((count) => {
      setTotalPages(count);
    });
  }, [search]);
  useEffect(() => {
    getPostPageCount("").then((count) => {
      setTotalPages(count);
    });
  }, []);

  useEffect(() => {
    getPosts(search, page).then((res) => {
      setPosts(res);
    });
  }, []);

  useEffect(() => {
    if (del) {
      getPosts(search, 1).then((res) => {
        setPosts(res);
        setDel(false);
        setPage(1);
      });
    }
  }, [del]);

  return (
    <>
      {edit && (
        <AdminPostModal
          setPost={setPost}
          setEdit={setEdit}
          setCancel={setCancel}
          setGet={setGet}
          post={post}
          text={text}
        />
      )}
      <AdminSearch pageText={text.placeholder} page="posts" />
      <div className="admin-posts">
        {posts.map((post: any) => {
          return (
            <AdminPost
              post={post}
              setPost={setPost}
              setEdit={setEdit}
              key={post.id}
              setDel={setDel}
              text={text}
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
export default AdminPosts;
