import React from "react";

const Sort = ({
  handleChange,
  sortProducts,
  pageText,
}: {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortProducts: () => void;
  pageText: {
    heading: string;
    options: string[];
  };
}) => {
  return (
    <div className="sort">
      <select className="sort-select" onChange={handleChange}>
        <option value="a-z">{pageText.options[0]}</option>
        <option value="z-a">{pageText.options[1]}</option>
        <option value="price-ascending">{pageText.options[2]}</option>
        <option value="price-descending">{pageText.options[3]}</option>
      </select>
      <button className="sort-btn" onClick={sortProducts}>
        {pageText.heading}
      </button>
    </div>
  );
};

export default Sort;
