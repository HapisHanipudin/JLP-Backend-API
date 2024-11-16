import express, { json } from "express";
import vendorController from "../controllers/vendor.js";
const router = express.Router();

router.route("/").get(vendorController.index).post(vendorController.create);
router.route("/dashboard").get(vendorController.dashboard);
router.route("/:slug").get(vendorController.getBySlug);
router.route("/:slug/products").get(vendorController.getProducts);
router.route("/:slug/reviews").get(vendorController.getReviews).post(vendorController.postReview);
router.route("/category/:category").get(vendorController.getByCategory);
router.route("/id/:id").get(vendorController.getVendorById).put(vendorController.update);

export default router;
