import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate"; // Use this instead

const CustomPagination = ({ resultPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState(0);
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    // React-paginate is 0-indexed (Page 1 = index 0)
    setCurrentPage(page - 1);
  }, [page]);

  const handlePageClick = (event) => {
    const pageNumber = event.selected + 1;

    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const pageCount = Math.ceil(filteredProductsCount / resultPerPage);

  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resultPerPage && (
        <ReactPaginate
          forcePage={currentPage}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          
          // Labels
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          
          // Bootstrap Classes (Keep your existing styling)
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default CustomPagination;
