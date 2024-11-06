import express from "express";
import reviewController from "../controllers/review.js";
const router = express.Router();

router.route("/:vendorId").post(reviewController.post).get(reviewController.get);
router.route("/r/:reviewId").put().delete();

export default router;
