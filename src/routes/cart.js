import express from "express";
import cartController from "../controllers/cart.js";
const router = express.Router();

router.route("/").post(cartController.post).get(cartController.getUserCart);
router.route("/:cartId").put(cartController.index).delete(cartController.index);

export default router;
