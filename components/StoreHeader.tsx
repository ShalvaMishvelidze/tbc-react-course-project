import { Link } from "@/navigation";
import React from "react";

const StoreHeader = () => {
  return (
    <div className="store-header">
      <form className="search">
        <input type="search" className="search-input" />
        <button type="submit" className="search-btn">
          search
        </button>
      </form>
      <div className="store-header-container">
        <Link className="store-header-btn" href="/add-new-product">
          add new product
        </Link>
      </div>
    </div>
  );
};

export default StoreHeader;
