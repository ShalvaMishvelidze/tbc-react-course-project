"use client";
import { useEffect, useState } from "react";
import { Blog } from "../../components/Blog";
import { POSTS_API_URL as api_uri } from "../../utils/constants";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(api_uri);
      const data = await response.json();
      setPosts([...data.posts]);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.error(e);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <div className="blogs">loading...</div>;
  }

  return (
    <section className="blogs">
      {posts.map((post) => {
        return <Blog key={post.id} post={post} />;
      })}
    </section>
  );
};

export default Blogs;
