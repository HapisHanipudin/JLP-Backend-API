import express, { json } from "express";
import vendorController from "../controllers/vendor.js";
const router = express.Router();

router.route("/").get(vendorController.index).post(vendorController.create);

router.route("/:slug").get(vendorController.getBySlug).put(vendorController.update);
router.route("/category/:category").get(vendorController.getByCategory);

export default router;
