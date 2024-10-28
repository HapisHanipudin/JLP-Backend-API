import express from "express";
const router = express.Router();
import paymentController from "../controllers/payment.js";

// Endpoint untuk membuat transaksi
router.post("/create-transaction", paymentController.index);
router.route("/confirmation").post(paymentController.confirmation);

export default router;
