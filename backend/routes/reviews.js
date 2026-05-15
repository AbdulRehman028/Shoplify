import express from "express";
import { authorizeRoles, isAuthenticatedUser, } from "../middlewares/authMiddleware.js";
import { createProductReview, getProductReviews, deleteReview } from "../controllers/reviewsController.js";

const router = express.Router();

router.route("/reviews")
.put(isAuthenticatedUser, createProductReview)
.get(isAuthenticatedUser, getProductReviews); 

router
  .route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

export default router;