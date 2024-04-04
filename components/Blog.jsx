import Image from "next/image";

export function Blog({ blog }) {
  return (
    <article className="blog">
      <h4 className="blog-title">{blog.title}</h4>
      <Image
        className="blog-image"
        src={blog.image}
        alt={blog.title}
        width={160}
        height={90}
      />
      <h4>{blog.date}</h4>
      <p className="blog-desc">
        {blog.desc} <button>read more</button>
      </p>
    </article>
  );
}
