import {
  //  getPosts,
    getSinglePost } from "../../../../utils/actions";

interface Post {
  title: string;
  body: string;
  reactions: number;
  tags: string[];
}

// export const generateStaticParams = async () => {
//   const posts: { id: number }[] = await getPosts();

//   return posts.map((post) => {
//     return { id: post.id.toString() };
//   });
// };

const SingleBlog = async ({ params: { id } }: { params: { id: string } }) => {
  const post: Post = await getSinglePost(id);

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
