import Comments from "@/components/Comments";
import LoadingSpinner from "@/components/LoadingSpinner";
import ReactionsContainer from "@/components/ReactionsContainer";
import ViewsContainer from "@/components/ViewsContainer";
import { getSystemPreferences } from "@/utils/actions";
import { getPost } from "@/utils/actions/blog_actions";
import { getUserRole } from "@/utils/actions/user_actions";
import { libraries } from "@/utils/constants";
import { Post } from "@/utils/interfaces";
import { getSession } from "@auth0/nextjs-auth0";

const SingleBlog = async ({ params: { id } }: { params: { id: string } }) => {
  const { language } = await getSystemPreferences();
  const session = await getSession();
  const post: Post = (await getPost(
    id as string,
    session?.user.sub as string
  )) as Post;
  const role = await getUserRole(session?.user.sub as string);
  const text = libraries[language].main.blog;

  if (!post || !role || !text) {
    return <LoadingSpinner />;
  }

  return (
    <section className="single-blog">
      <h1 className="single-blog-title">{post.title}</h1>
      <p className="single-blog-content">{post.body}</p>
      <ViewsContainer views={post.views} id={post.id} text={text.views} />
      <div className="single-blog-tag-container">
        <span>{text.tags}: </span>
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
        user_vote_type={post.user_vote_type}
      />
      <Comments post_id={id} text={text} role={role} />
    </section>
  );
};
export default SingleBlog;
