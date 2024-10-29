import express from "express";
import cartController from "../controllers/cart.js";
const router = express.Router();

router.route("/").post(cartController.post).get(cartController.getUserCart);

export default router;
