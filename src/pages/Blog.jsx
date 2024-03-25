import React from "react";
import { blogs } from "../utils/constants";

// /blog
// მთაგვარი გვერდი, სადაც ბლოგპოსტების სია იქნება გამოტანილი.
// გამოიტანეთ 20 ბლოგპოსტი, თავად დააგენერირეთ სტატიკური დატა.
// თითოეულს უნდა ჰქონდეს სათაური, აღწერა, ფოტო,
// გამოქვეყნების თარიღი და "სრულად წაკითხვა" ღილაკი (ან რამე მსგავსი ტექსტით).

const Blog = () => {
  return (
    <section className="blogs">
      {blogs.map((blog) => {
        return (
          <article className="blog">
            <h3>{blog.title}</h3>
            <img src={blog.image} alt={blog.title} />
            <h4>{blog.date}</h4>
            <p>
              {blog.desc}{" "}
              <span onClick={() => console.log("hello")}>read more</span>
            </p>
          </article>
        );
      })}
    </section>
  );
};

export default Blog;
