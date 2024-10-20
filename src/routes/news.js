import express from "express";
import newsController from "../controllers/news.js";
const router = express.Router();

router.route("/").get(newsController.index).post(newsController.create);
router.route("/:id").get(newsController.getById).put(newsController.update);

export default router;
