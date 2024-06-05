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
    </div>
  );
};

export default StoreHeader;
