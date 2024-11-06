import express from "express";
import cartController from "../controllers/cart.js";
const router = express.Router();

router.route("/").post(cartController.post).get(cartController.getUserCart);
router.route("/:cartId").put().delete();

export default router;
