"use client";

import { addPostView } from "@/utils/actions/blog_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ViewsContainer = ({ views: w, id, text }: any) => {
  const { user, error, isLoading } = useUser();
  const [views, setViews] = useState<number>(Number(w));

  useEffect(() => {
    addPostView(id, user?.sub as string).then((w) => {
      if (w) {
        setViews(views + 1);
      }
    });
  }, []);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <h4 className="single-blog-reactions">
      {text}: {views}
    </h4>
  );
};
export default ViewsContainer;
