"use client";

import { editPost } from "@/utils/actions/admin_actions";
import { useState } from "react";

const AdminPostModal = ({
  post,
  setPost,
  setEdit,
  setCancel,
  setGet,
  text,
}: any) => {
  const [newTag, setNewTag] = useState("");

  return (
    <div className="admin-post-modal">
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>{text.title}:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <label>{text.body}:</label>
          <textarea
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
          <label>{text.tags}:</label>
          <div className="tags">
            {post.tags.map((tag: string, index: number) => {
              return (
                <div className="tag" key={index}>
                  <button
                    type="button"
                    onClick={() =>
                      setPost({
                        ...post,
                        tags: [...post.tags.filter((t: string) => t !== tag)],
                      })
                    }
                  >
                    x
                  </button>
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
          <div className="tag-input">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              className="btn"
              type="button"
              onClick={() => {
                if (newTag) {
                  setPost({ ...post, tags: [...post.tags, newTag] });
                  setNewTag("");
                }
              }}
            >
              {text.addTag}
            </button>
          </div>
          <div className="container-btns">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                editPost(post).then(() => {
                  setEdit(false);
                  setGet(true);
                });
              }}
            >
              {text.save}
            </button>
            <button onClick={() => setCancel(true)} type="button">
              {text.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminPostModal;
