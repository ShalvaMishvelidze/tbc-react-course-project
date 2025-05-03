"use client";
import { Dispatch, SetStateAction } from "react";

const Sort = ({
  pageText,
  setSort,
  setOrder,
}: {
  pageText: {
    heading: string;
    options: string[];
  };
  setSort: Dispatch<SetStateAction<string>>;
  setOrder: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="sort">
      <select
        className="sort-select"
        onChange={(e) => {
          const [sortValue, orderValue] = e.target.value.split(" ");
          setSort(sortValue);
          setOrder(orderValue);
        }}
      >
        <option value="name asc">{pageText.options[0]}</option>
        <option value="name desc">{pageText.options[1]}</option>
        <option value="price asc">{pageText.options[2]}</option>
        <option value="price desc">{pageText.options[3]}</option>
      </select>
    </div>
  );
};

export default Sort;
