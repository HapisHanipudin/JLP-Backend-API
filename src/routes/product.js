import express from "express";
import productController from "../controllers/product.js";
const router = express.Router();

router.route("/").post(productController.post);
router.route("/:id").get(productController.getProductById).put().delete();

export default router;
