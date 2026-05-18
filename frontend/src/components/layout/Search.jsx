import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"

import { useSearchParams } from "react-router-dom";

const Search = () => {
//   const [keyword, setKeyword] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (keyword?.trim()) {
//       navigate(`/?keyword=${keyword}`);
//     } else {
//       navigate(`/`);
//     }
//   };

  const [keyword, setKeyword] = useState("");
  const [searchParams] = useSearchParams(); // 1. Grab existing filters
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword?.trim()) {
      searchParams.set("keyword", keyword); // 2. Update ONLY the keyword
      searchParams.delete("page"); // 3. Reset to page 1 for new search
    } else {
      searchParams.delete("keyword");
    }

    // 4. Navigate while keeping all other params (min, max, category)
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Enter Product Name ..."
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button id="search_btn" className="btn" type="submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default Search;