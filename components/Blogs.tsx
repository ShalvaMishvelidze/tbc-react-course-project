"use client";
import { getAllPosts, getBlogPageCount } from "@/utils/actions/blog_actions";
import { SingleBlog } from "./SingleBlog";
import { Post } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { BlogSearch } from "./BlogSearch";
import { useSearchParams } from "next/navigation";
import PageSelector from "./PageSelector";

const Blogs = ({ user }: { user: any }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  useEffect(() => {
    getAllPosts(user?.sub as string, search, 1).then((posts) => {
      setPosts(posts as Post[]);
    });
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    getAllPosts(user?.sub as string, search, currentPage).then((posts) => {
      setPosts(posts as Post[]);
    });
  }, [currentPage]);

  useEffect(() => {
    if (searchString) {
      setSearch(searchString);
    } else {
      getAllPosts(user?.sub as string, "", 1).then((posts) => {
        setPosts(posts as Post[]);
      });
    }
  }, [searchString]);

  useEffect(() => {
    getBlogPageCount().then((count) => {
      setTotalPages(count);
    });
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BlogSearch pageText="type here..." />
      <section className="blogs">
        {posts.map((post) => {
          return <SingleBlog key={post.id} post={post} user={user} />;
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
