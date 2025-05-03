"use client";
import { SingleBlog } from "./SingleBlog";
import { Post } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { BlogSearch } from "./BlogSearch";
import { useSearchParams } from "next/navigation";
import PageSelector from "./PageSelector";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "./LoadingSpinner";

const Blogs = ({
  text,
}: {
  text: {
    [key: string]: string;
  };
}) => {
  const { user, error, isLoading } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  useEffect(() => {
    const getAllPosts = async (
      current_user_id: string,
      search: string,
      page: number
    ) => {
      const res = await fetch("/api/blog/blogs", {
        method: "POST",
        body: JSON.stringify({ search, page, current_user_id }),
      });
      const data = await res.json();

      setPosts(data as Post[]);
      const pageRes = await fetch("/api/blog/page-count", {
        method: "POST",
        body: JSON.stringify({ search }),
      });
      const pageData = await pageRes.json();
      setTotalPages(pageData.pages);
    };
    getAllPosts(user?.sub as string, search, currentPage);
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const getAllPosts = async (
      current_user_id: string,
      search: string,
      page: number
    ) => {
      const res = await fetch("/api/blog/blogs", {
        method: "POST",
        body: JSON.stringify({ search, page, current_user_id }),
      });
      const data = await res.json();

      setPosts(data as Post[]);
    };
    getAllPosts(user?.sub as string, search, currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchString) {
      setSearch(searchString);
    } else {
      setSearch("");
    }
  }, [searchString]);

  useEffect(() => {
    const getAllPosts = async (current_user_id: string) => {
      const res = await fetch("/api/blog/blogs", {
        method: "POST",
        body: JSON.stringify({ search: "", page: 1, current_user_id }),
      });
      const data = await res.json();

      setPosts(data as Post[]);
      const pageRes = await fetch("/api/blog/page-count", {
        method: "POST",
        body: JSON.stringify({ search: "" }),
      });
      const pageData = await pageRes.json();
      setTotalPages(pageData.pages);
    };
    getAllPosts(user?.sub as string);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <BlogSearch pageText={text.placeholder} />
      <br />
      <br />
      <section className="blogs">
        {posts.map((post) => {
          return <SingleBlog key={post.id} post={post} text={text} />;
        })}
      </section>
      {totalPages > 1 && (
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Blogs;
