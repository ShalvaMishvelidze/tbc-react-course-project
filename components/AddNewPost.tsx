"use client";
import { addNewPost } from "@/utils/blog_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";

const AddNewPost = () => {
  const t = useTranslations("addNewPost");
  const { user, error, isLoading } = useUser();
  const [post, setPost] = useState<any>({
    title: "",
    body: "",
    tags: [],
  });
  const [tag, setTag] = useState("");

  if (isLoading) {
    return <div className="loading">loading</div>;
  }

  if (error) {
    return <div className="error">error</div>;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost((prevState: any) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  const addNewTag = () => {
    if (post.tags.length >= 4) {
      return;
    }
    setPost({ ...post, tags: [...post.tags, tag] });
    setTag("");
  };

  return (
    <section className="new-post">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewPost(post.title, post.body, post.tags, user?.sub as string);
        }}
      >
        <label className="new-post-label">{t("title")}:</label>
        <input
          onChange={handleChange}
          className="new-post-input"
          type="text"
          id="title"
          required
          data-type="title"
          value={post.title}
        />

        <label className="new-post-label">{t("body")}:</label>
        <textarea
          onChange={handleChange}
          className="new-post-textarea"
          id="body"
          data-type="body"
          rows={4}
          cols={60}
          required
          value={post.body}
        ></textarea>
        {post.tags.length !== 0 &&
          post.tags.map((tag: any, index: number) => {
            return (
              <div key={index} className="tag">
                {tag}
              </div>
            );
          })}
        <div className="tag-form">
          <label>{t("tags")}:</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addNewTag();
            }}
          >
            add
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addNewPost(post.title, post.body, post.tags, user?.sub as string);
          }}
          type="submit"
          className="new-post-btn"
        >
          {t("addPost")}
        </button>
      </form>
    </section>
  );
};

export default AddNewPost;
