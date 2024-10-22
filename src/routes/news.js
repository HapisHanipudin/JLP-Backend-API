import express from "express";
import newsController from "../controllers/news.js";
const router = express.Router();

router.route("/").get(newsController.index);
router.route("/post").post(newsController.create);
router.route("/:slug").get(newsController.getBySlug).put(newsController.update);

export default router;
