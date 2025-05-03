"use client";

const PageSelector = ({ currentPage, totalPages, onPageChange }: any) => {
  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="pages">
      {currentPage > 5 && totalPages > 10 && (
        <button
          className={currentPage === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          1
        </button>
      )}
      <div className="space" />
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(
          totalPages < 11
            ? 0
            : currentPage - 1 < totalPages - 7
            ? currentPage - 5 >= 1
              ? currentPage - 5
              : 0
            : totalPages - 11,
          totalPages < 11 ? totalPages : currentPage > 5 ? currentPage + 5 : 10
        )
        .map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        ))}
      <div className="space" />
      {currentPage < totalPages - 5 && totalPages > 10 && (
        <button
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default PageSelector;
