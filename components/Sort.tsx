"use client";

import { useState } from "react";

const Sort = ({
  sortProducts,
  pageText,
}: {
  sortProducts: (sort: string) => void;
  pageText: {
    heading: string;
    options: string[];
  };
}) => {
  const [sort, setSort] = useState<string>("a-z");
  return (
    <div className="sort">
      <select
        className="sort-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="a-z">{pageText.options[0]}</option>
        <option value="z-a">{pageText.options[1]}</option>
        <option value="price-ascending">{pageText.options[2]}</option>
        <option value="price-descending">{pageText.options[3]}</option>
      </select>
      <button className="sort-btn" onClick={() => sortProducts(sort)}>
        {pageText.heading}
      </button>
    </div>
  );
};

export default Sort;
