import express from "express";
import orderController from "../controllers/order.js";
const router = express.Router();

router.route("/").post(orderController.post).get(orderController.getUserOrder);
router.route("/:status").get(orderController.getUserOrderByStatus);

export default router;
