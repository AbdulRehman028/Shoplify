import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ApiFilters from "../utils/apiFilters.js";

// Get all products --> api/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 4;

  const apiFilters = new ApiFilters(Product, req.query)
    .search()
    .filters();

  // Efficient count – no full document fetch
  const filteredProductsCount = await apiFilters.query.clone().countDocuments();

  // Apply pagination
  apiFilters.pagination(resultPerPage);

  const products = await apiFilters.query;

  res.status(200).json({
    success: true,
    resultPerPage,
    filteredProductsCount,
    products,
    // Optional but highly recommended for frontend pagination UI
    // totalPages: Math.ceil(filteredProductsCount / resultPerPage),
  });
});

// Create new product --> api/admin/products
export const newProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id; // Associate product with the authenticated user

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "New product created successfully.",
    product,
  });
});

// Get single product --> api/products/:id
export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product details --> api/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product --> api/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});
