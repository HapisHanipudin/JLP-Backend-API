import express from "express";
import userController from "../controllers/user.js";
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/refresh").get(userController.refreshToken);

export default router;
