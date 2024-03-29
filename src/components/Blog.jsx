export function Blog({ blog }) {
  return (
    <article className="blog">
      <h4 className="blog-title">{blog.title}</h4>
      <img className="blog-image" src={blog.image} alt={blog.title} />
      <h4>{blog.date}</h4>
      <p className="blog-desc">
        {blog.desc}{" "}
        <button onClick={() => console.log("hello")}>read more</button>
      </p>
    </article>
  );
}
