import React, { useEffect } from "react";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

import { useGetProductsQuery } from "../redux/productApi";

import MetaData from "./layout/MetaData";
import Loader from "./layout/Loder";
import ProductItem from "./product/ProductItem";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const prams = { page };

  const { data, isLoading, error, isError } = useGetProductsQuery(prams);

  useEffect(() => {
    if (isError) {
      const errorMessage =
        error?.data?.message || "Could not connect to server";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        <div className="col-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
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
