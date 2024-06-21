import MyBlogs from "@/components/MyBlogs";
import { getMyPosts } from "@/utils/actions/blog_actions";
import { Post } from "@/utils/interfaces";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default withPageAuthRequired(
  async () => {
    const session = await getSession();
    const myPosts: Post[] = (await getMyPosts(session?.user.sub)) as Post[];
    return (
      <>
        <Link href={"/add-new-post"} className="new-post-btn">
          +add new post
        </Link>
        <br />
        <br />
        <br />
        <section className="blogs">
          <MyBlogs myPosts={myPosts} user={session?.user} />
        </section>
      </>
    );
  },
  { returnTo: "/my-posts" }
);
