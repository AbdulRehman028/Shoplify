import React, { useEffect } from "react";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

import { useGetProductsQuery } from "../redux/productApi";

import MetaData from "./layout/MetaData";
import Loader from "./layout/Loder";
import ProductItem from "./product/ProductItem";
import Filters from "./layout/Filters";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const category = searchParams.get("category") || "";
  const ratings = searchParams.get("ratings") || "";

  // 1. Start with the basics
  const params = { page, keyword };

  // 2. ONLY add filters if they are not empty strings/null
  if (min !== "") params.min = min;
  if (max !== "") params.max = max;
  if (category !== "") params.category = category;
  if (ratings !== "") params.ratings = ratings;

  // 3. Send the cleaned params to the API
  const { data, isLoading, error, isError } = useGetProductsQuery(params);


  useEffect(() => {
    if (isError) {
      const errorMessage =
        error?.data?.message || "Could not connect to server";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        {/* Show Filters if keyword exists (Search mode) */}
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}

        {/* Change: Always show this div, but adjust width based on keyword */}
        <div className={keyword ? "col-6 col-md-9" : "col-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.products?.length} results for '${keyword}'`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {/* Add a safety check: only map if products exist */}
              {data?.products?.length > 0 ? (
                data?.products?.map((product) => (
                  <ProductItem key={product._id} product={product} columnSize={columnSize} />
                ))
              ) : (
                <div className="mt-5 text-center">
                   <h3>No Products Found</h3>
                </div>
              )}
            </div>
          </section>

          <CustomPagination
            resultPerPage={data?.resultPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );

};

export default Home;
