"use client";

import { deletePost } from "@/utils/actions/admin_actions";
import { toast } from "react-toastify";

const AdminPost = ({ post, setDel, setPost, setEdit, text }: any) => {
  return (
    <div className="admin-post">
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 30)}</p>
      <div className="admin-post-tags">
        {post.tags.map((tag: string) => {
          return <span key={tag}>{tag}</span>;
        })}
      </div>
      <div className="admin-post-btns">
        <button
          onClick={() => {
            setPost(post);
            setEdit(true);
          }}
        >
          {text.edit}
        </button>
        <button
          onClick={() => {
            toast.info("deleting post...");
            deletePost(post.id).then(() => {
              setDel(true);
              toast.success("post deleted");
            });
          }}
        >
          {text.delete}
        </button>
      </div>
    </div>
  );
};
export default AdminPost;
