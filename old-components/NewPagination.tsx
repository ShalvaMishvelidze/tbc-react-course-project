"use client";

import { Dispatch, SetStateAction } from "react";

const PageSelector = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const handleClick = (page: number) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pages">
      <FirstPage
        page={page}
        totalPages={totalPages}
        handleClick={handleClick}
      />
      <div className="space" />
      <Pages page={page} totalPages={totalPages} handleClick={handleClick} />
      <div className="space" />
      <LastPage page={page} totalPages={totalPages} handleClick={handleClick} />
    </div>
  );
};

export default PageSelector;

interface PageProps {
  page: number;
  totalPages: number;
  handleClick: (page: number) => void;
}

const FirstPage = ({ page, totalPages, handleClick }: PageProps) => {
  return (
    <>
      {page > 5 && totalPages > 10 && (
        <button
          className={page === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          1
        </button>
      )}
    </>
  );
};

const LastPage = ({ page, totalPages, handleClick }: PageProps) => {
  return (
    <>
      {page < totalPages - 5 && totalPages > 10 && (
        <button
          className={page === totalPages ? "active" : ""}
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </button>
      )}
    </>
  );
};

const Pages = ({ page, totalPages, handleClick }: PageProps) => {
  const numberArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getStartIndex = () => {
    if (totalPages < 11) return 0;
    if (page - 1 < totalPages - 7) {
      if (page - 5 >= 1) {
        return page - 5;
      }
      return 0;
    }
    return totalPages - 11;
  };

  const getEndIndex = () => {
    if (totalPages < 11) {
      return totalPages;
    }
    if (page > 5) {
      return page + 5;
    }
    return 10;
  };

  const startIndex = getStartIndex();

  const endIndex = getEndIndex();

  const pagesArr = numberArr.slice(startIndex, endIndex);

  return (
    <>
      {pagesArr.map((pageNum) => (
        <button
          key={`page-${pageNum}`}
          className={page === pageNum ? "active" : ""}
          onClick={() => handleClick(pageNum)}
        >
          {pageNum}
        </button>
      ))}
    </>
  );
};
