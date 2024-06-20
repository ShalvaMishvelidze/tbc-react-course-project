"use client";
import { Post } from "@/utils/interfaces";
import { MyBlog } from "./MyBlog";
import BlogModal from "./BlogModal";
import { useState } from "react";

const MyBlogs = ({ myPosts, user }: { myPosts: Post[]; user: any }) => {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>(myPosts);
  const [post, setPost] = useState<Post | null>(null);

  return (
    <>
      {modal && post && (
        <BlogModal
          setModal={setModal}
          post={post}
          setPosts={setPosts}
          setPost={setPost}
        />
      )}
      {posts.map((post) => {
        return (
          <MyBlog
            key={post.id}
            post={post}
            user={user}
            setModal={setModal}
            setPost={setPost}
            setPosts={setPosts}
          />
        );
      })}
    </>
  );
};
export default MyBlogs;
