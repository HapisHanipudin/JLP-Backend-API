import express from "express";
import orderController from "../controllers/order.js";
const router = express.Router();

router.route("/").post(orderController.post);

export default router;
