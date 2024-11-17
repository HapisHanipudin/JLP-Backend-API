import express from "express";
import orderController from "../controllers/order.js";
const router = express.Router();

router.route("/").post(orderController.post).get(orderController.getUserOrder);
router.route("/track").get(orderController.trackOrder);
router.route("/status/:status").get(orderController.getUserOrderByStatus);
router.route("/id/:orderId").put(orderController.updateOrder).delete(orderController.index);
router.route("/item/:id").put(orderController.updateOrderItem).delete(orderController.index);

export default router;
