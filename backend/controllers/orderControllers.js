import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new order only for creating cash on delivery orders => /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxAmount,
    shippingAmount,
    paymentInfo,
    totalAmount,
    paymentMethod,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxAmount,
    shippingAmount,
    paymentInfo,
    totalAmount,
    paymentMethod,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

// Get currently logged in user orders => /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders.length === 0) {
    return res.status(200).json({
      success: true,
      message: "You do not have any orders yet",
      orders: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "My orders fetched successfully",
    orders,
  });
});

// Get Order details => /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    message: "Order details fetched successfully",
    order,
  });
});

// Get all orders -  ADMIN => /api/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    message: "All orders fetched successfully",
    orders,
  });
});

// Update order - ADMIN => /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // Update Product Stock
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("Product not found with this id", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    order,
  });
});


// Get DeleteOrder details => /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order Deleted successfully",
  });
});