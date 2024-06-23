"use client";

import { addPostView } from "@/utils/actions/blog_actions";
import { useEffect, useState } from "react";

const ViewsContainer = ({ views: w, id, user_id, text }: any) => {
  const [views, setViews] = useState<number>(Number(w));

  useEffect(() => {
    addPostView(id, user_id).then((w) => {
      if (w) {
        setViews(views + 1);
      }
    });
  }, []);
  return (
    <h4 className="single-blog-reactions">
      {text}: {views}
    </h4>
  );
};
export default ViewsContainer;
