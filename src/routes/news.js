import express from "express";
import newsController from "../controllers/news.js";
const router = express.Router();

router.route("/").get(newsController.index).post(newsController.create);
router.route("/:slug").get(newsController.getBySlug).put(newsController.update).delete();

export default router;
