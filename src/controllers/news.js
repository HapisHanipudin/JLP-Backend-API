import { createNews, getNews, getNewById } from "../db/news.js";
import formidable from "formidable";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { request } from "express";

export default {
  index: async (req, res) => {
    const news = await getNews();
    res.send(news);
  },
  create: async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      }

      const { title, content } = fields;
      const { image, video } = files;

      const userId = req.auth.id;

      const imageUpload = await cloudinaryUpload(image[0].filepath);
      const videoUpload = await cloudinaryUpload(video[0].filepath);

      const slug = title[0]
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/\s/g, "-");
      const data = {
        title: title[0],
        content: content[0],
        slug,
        authorId: userId,
        image_url: imageUpload,
        video_url: videoUpload,
      };

      const post = await createNews(data);

      res.json(post);
    });
  },
  getById: async (req, res) => {
    const result = await getNewById(req.params.id);
    res.json(result);
  },
  update: async (req, res) => {},
};
