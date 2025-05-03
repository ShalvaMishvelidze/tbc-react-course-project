import { Products } from "@/utils/interfaces";
import React, { Dispatch, SetStateAction } from "react";

const CategoriesSelect = ({
  categories,
  pageText,
  category,
  setCategory,
}: {
  categories: string[];
  pageText: Products;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      {categories.length !== 0 && (
        <div className="products-categories">
          <h3>{pageText.categories}:</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={"all"}>All</option>
            {categories.map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default CategoriesSelect;
