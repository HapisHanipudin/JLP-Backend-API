import express from "express";
const router = express.Router();
import paymentController from "../controllers/payment.js";

// Endpoint untuk membuat transaksi
router.post("/create-transaction", paymentController.index);

export default router;
