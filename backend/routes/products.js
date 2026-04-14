import express from "express";
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/products").get(getProducts); // Route to get all products
router.route("/products/:id").get(getSingleProduct); // Route to get a single product by ID


router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct); // Admin route to create a new product
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct); // Admin route to update a product by ID
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); // Admin route to delete a product by ID

export default router;
