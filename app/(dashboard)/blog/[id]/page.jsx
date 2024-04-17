"use client";
import { useEffect, useState } from "react";
import { POSTS_API_URL } from "../../../../utils/constants";

const SingleBlog = ({ params: { id } }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${POSTS_API_URL}/${id}`);
      const data = await response.json();
      setPost(data);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="single-post">loading...</div>;
  }

  return (
    <section className="single-blog">
      <h1 className="single-blog-title">{post.title}</h1>
      <p className="single-blog-content">{post.body}</p>
      <h4 className="single-blog-reactions">Reactions: {post.reactions}</h4>
      <div className="single-blog-tag-container">
        <span>Tags: </span>
        {post.tags.map((tag, index) => {
          return (
            <span key={index} className="single-blog-tag">
              {tag}
            </span>
          );
        })}
      </div>
    </section>
  );
};
export default SingleBlog;
