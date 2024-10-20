import express, { json } from "express";
import vendorController from "../controller/vendor.js";
const router = express.Router();

router.route("/").get(vendorController.index).post(vendorController.create);

router.route("/:id").get(vendorController.getById).put(vendorController.uodate);

export default router;
