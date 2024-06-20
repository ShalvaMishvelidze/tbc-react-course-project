import Comments from "@/components/Comments";
import ReactionsContainer from "@/components/ReactionsContainer";
import ViewsContainer from "@/components/ViewsContainer";
import { getPost } from "@/utils/actions/blog_actions";
import { Post } from "@/utils/interfaces";
import { getSession } from "@auth0/nextjs-auth0";

const SingleBlog = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getSession();
  const post: Post = (await getPost(
    id as string,
    session?.user.sub as string
  )) as Post;

  return (
    <section className="single-blog">
      <h1 className="single-blog-title">{post.title}</h1>
      <p className="single-blog-content">{post.body}</p>
      <ViewsContainer
        views={post.views}
        id={post.id}
        user_id={session?.user.sub}
      />
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
      <ReactionsContainer
        id={post.id}
        total_likes={post.total_likes}
        total_dislikes={post.total_dislikes}
        user={session?.user}
        user_vote_type={post.user_vote_type}
      />
      <Comments post_id={id} user={session?.user} />
    </section>
  );
};
export default SingleBlog;
