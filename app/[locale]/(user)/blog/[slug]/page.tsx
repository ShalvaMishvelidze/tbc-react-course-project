import { getPost } from "@/utils/blog_actions";

const page = async ({ params: { slug } }) => {
  const post = await getPost(slug as string);

  if (!post) {
    return <div className="no-post">no post</div>;
  }

  return (
    <section className="single-blog-page">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {post.tags.map((tag: string, index: number) => {
        return <div key={index}>{tag}</div>;
      })}
    </section>
  );
};

export default page;
