import express from "express";
import userController from "../controllers/user.js";
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/refresh").get(userController.refreshToken);
router.route("/user").get(userController.index).put(userController.editProfile);
router.route("/user/profile").put(userController.profileImage);
router.route("/vendor").get(userController.getVendor);

export default router;
