import { getPost } from "@/utils/actions/blog_actions";
import { Post } from "@/utils/interfaces";

const SingleBlog = async ({ params: { id } }: { params: { id: string } }) => {
  const post: Post = (await getPost(id)) as Post;

  return (
    <section className="single-blog">
      <h1 className="single-blog-title">{post.title}</h1>
      <p className="single-blog-content">{post.body}</p>
      <h4 className="single-blog-reactions">Views: {post.views}</h4>
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
