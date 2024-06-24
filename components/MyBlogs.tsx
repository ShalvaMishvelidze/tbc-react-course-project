"use client";
import { Post } from "@/utils/interfaces";
import { MyBlog } from "./MyBlog";
import BlogModal from "./BlogModal";
import { useEffect, useState } from "react";
import Toast from "./Toast";
import { getMyPosts } from "@/utils/actions/blog_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "./LoadingSpinner";

const MyBlogs = ({
  myPosts,
  text,
}: {
  myPosts: Post[];
  text: { [key: string]: string };
}) => {
  const { user, error, isLoading } = useUser();
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>(myPosts);
  const [post, setPost] = useState<Post | null>(null);
  const [get, setGet] = useState(false);

  useEffect(() => {
    if (get) {
      getMyPosts(user?.sub as string).then((data) => {
        setPosts(data as Post[]);
        setGet(false);
      });
    }
  }, [get]);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toast />
      {modal && post && (
        <BlogModal
          setEdit={setModal}
          post={post}
          setPost={setPost}
          setGet={setGet}
          text={text}
        />
      )}
      <section className="blogs">
        {posts.map((post) => {
          return (
            <MyBlog
              key={post.id}
              post={post}
              user={user}
              setModal={setModal}
              setPost={setPost}
              setPosts={setPosts}
              text={text}
            />
          );
        })}
      </section>
    </>
  );
};
export default MyBlogs;
