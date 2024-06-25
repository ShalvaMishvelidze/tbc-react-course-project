"use client";
import { addNewPost } from "@/utils/actions/blog_actions";
import { libraries } from "@/utils/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ChangeEvent, useState } from "react";
import Toast from "./Toast";
import { toast } from "react-toastify";

const AddNewPost = ({ language }: { language: string }) => {
  const { title, body, tags, addPost } = libraries[language].main.addNewPost;

  const { user, error, isLoading } = useUser();
  const [post, setPost] = useState<any>({
    title: "",
    body: "",
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [dis, setDis] = useState(false);

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
      toast.warning("You can only add up to 4 tags");
      return;
    }
    setPost({ ...post, tags: [...post.tags, tag] });
    setTag("");
  };

  return (
    <>
      <Toast />
      <form
        className="new-post"
        onSubmit={(e) => {
          e.preventDefault();
          addNewPost(post.title, post.body, post.tags, user?.sub as string);
        }}
      >
        <label className="new-post-label">{title}:</label>
        <input
          onChange={handleChange}
          className="new-post-input"
          type="text"
          id="title"
          required
          data-type="title"
          value={post.title}
          maxLength={100}
        />

        <label className="new-post-label">{body}:</label>
        <textarea
          onChange={handleChange}
          className="new-post-textarea"
          id="body"
          data-type="body"
          rows={4}
          cols={60}
          required
          value={post.body}
          maxLength={1500}
        ></textarea>
        <div className="new-post-container">
          {post.tags.length !== 0 &&
            post.tags.map((tag: any, index: number) => {
              return (
                <div key={index} className="tag">
                  <span>{tag}</span>
                  <button
                    className="tag-btn"
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
                </div>
              );
            })}
        </div>
        <div className="tag-form">
          <label>{tags}:</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            maxLength={18}
          />
          <button
            type="button"
            className="new-post-btn"
            onClick={(e) => {
              e.preventDefault();
              addNewTag();
            }}
          >
            add
          </button>
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              setDis(true);
              toast.info("Adding post...");
              await addNewPost(
                post.title,
                post.body,
                post.tags,
                user?.sub as string
              );
              toast.success("Post added successfully!");
              setDis(false);
            } catch (error) {
              console.log(error);
              toast.error("Error adding post");
              setDis(false);
            }
          }}
          disabled={dis}
          type="submit"
          className="new-post-btn"
        >
          {addPost}
        </button>
      </form>
    </>
  );
};

export default AddNewPost;
