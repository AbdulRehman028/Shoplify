import React from "react";
import { Link } from "react-router-dom";

import { Rating } from "react-simple-star-rating";
import CustomImage from "../common/CustomImage";

const ProductItem = ({ product }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <CustomImage
          className="card-img-top mx-auto"
          src={product?.Images?.[0]?.url}
          alt={product?.name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product?._id}`}>{product?.name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <Rating
              initialValue={Number(product?.ratings) || 0} // Ensure it's a number
              readonly={true}
              size={22}
              fillColor="#ffb829"
              allowFraction={true} // This allows half/partial stars
              SVGstyle={{ display: "inline" }} // Fixes some layout alignment issues
            />
            <span id="no_of_reviews" className="pt-2 ps-2">
              {" "}
              ({product?.numOfReviews})
            </span>
          </div>
          <p className="card-text mt-2">${product?.price}</p>
          <Link
            to={`/product/${product?._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
