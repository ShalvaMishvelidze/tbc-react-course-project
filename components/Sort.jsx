import React from "react";

const Sort = ({ handleChange, sortProducts }) => {
  return (
    <div className="sort">
      <select className="sort-select" onChange={handleChange}>
        <option value="a-z">a-z</option>
        <option value="z-a">z-a</option>
        <option value="price-ascending">price ascending</option>
        <option value="price-descending">price descending</option>
      </select>
      <button className="sort-btn" onClick={sortProducts}>
        sort
      </button>
    </div>
  );
};

export default Sort;
