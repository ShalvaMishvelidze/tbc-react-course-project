import { getPosts, getSinglePost } from "../../../../utils/actions";

export const generateStaticParams = async () => {
  const posts = await getPosts();

  return posts.map((post) => {
    return { id: post.id.toString() };
  });
};

const SingleBlog = async ({ params: { id } }) => {
  const post = await getSinglePost(id);

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
