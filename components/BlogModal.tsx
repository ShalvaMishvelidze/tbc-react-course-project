"use client";
import { editPost } from "@/utils/actions/blog_actions";
import { useState } from "react";

const BlogModal = ({ post, setModal, setPost, setPosts }: any) => {
  const [tag, setTag] = useState("");
  return (
    <div className="modal">
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => {
            setPost({ ...post, title: e.target.value });
          }}
        />
        <label htmlFor="body">Body</label>
        <textarea
          placeholder="Body"
          value={post.body}
          onChange={(e) => {
            setPost({ ...post, body: e.target.value });
          }}
        />
        <div className="tags-continer">
          <form>
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              placeholder="Tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setPost({ ...post, tags: [...post.tags, tag] });
              }}
            >
              add
            </button>
          </form>
        </div>
        {post.tags.map((tag: string) => {
          return (
            <span>
              {tag}{" "}
              <button
                onClick={() => {
                  setPost({
                    ...post,
                    tags: post.tags.filter((t: string) => t !== tag),
                  });
                }}
              >
                del
              </button>
            </span>
          );
        })}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            editPost(post.id, post.title, post.body, post.tags).then((res) => {
              setPosts((prev: any) => {
                return [
                  ...prev.map((p: any) => {
                    if (p.id === post.id) {
                      return res;
                    }
                    return p;
                  }),
                ];
              });
              setModal(false);
            });
          }}
        >
          Submit
        </button>
        <button type="button" onClick={() => setModal(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};
export default BlogModal;
