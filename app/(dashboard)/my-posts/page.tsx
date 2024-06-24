import LoadingSpinner from "@/components/LoadingSpinner";
import MyBlogs from "@/components/MyBlogs";
import { getSystemPreferences } from "@/utils/actions";
import { getMyPosts } from "@/utils/actions/blog_actions";
import { libraries } from "@/utils/constants";
import { Post } from "@/utils/interfaces";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default withPageAuthRequired(
  async () => {
    const { language } = await getSystemPreferences();
    const session = await getSession();

    if (!language || !session) {
      return <LoadingSpinner />;
    }

    const myPosts: Post[] = (await getMyPosts(session?.user.sub)) as Post[];
    const adminText = libraries[language].main.admin;

    if (!myPosts || !adminText) {
      return <LoadingSpinner />;
    }

    return (
      <>
        <Link href={"/add-new-post"} className="new-post-btn">
          {adminText.addNewPost}
        </Link>
        <br />
        <br />
        <br />
        <MyBlogs myPosts={myPosts} text={adminText} />
      </>
    );
  },
  { returnTo: "/my-posts" }
);
