import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/productApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loder";
import { Rating } from "react-simple-star-rating";
import CustomImage from "../common/CustomImage";

const ProductDetails = () => {
  const params = useParams();

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id,
  );
  const product = data?.product;

  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    setActiveImg(
      product?.Images?.[0]
        ? product?.Images[0]?.url
        : "/images/default_product.png",
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <CustomImage
            className="d-block w-100"
            src={activeImg}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.Images?.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <button
                type="button"
                style={{ background: "none", border: "none", padding: 0 }}
                onClick={() => setActiveImg(img.url)}
              >
                <CustomImage
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeImg ? "border-warning" : ""
                  }`}
                  height="100"
                  width="100"
                  src={img?.url}
                  customDefault="/images/default_avatar.jpg"
                  alt="Thumbnail"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
          <Rating
            initialValue={product?.ratings || 0}
            readonly={true}
            size={24}
            fillColor="#ffb829"
            allowFraction={true}
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({product?.numOfReviews} Reviews)
          </span>
        </div>

        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readonly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
