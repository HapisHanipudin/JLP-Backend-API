import { createNews, getNews, getNewById, getNewsbySlug } from "../db/news.js";
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

      let slug = title[0]
        .toLocaleLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s/g, "-");

      let count = 1;
      let postWithSameSlug = await getNewsbySlug(slug);

      while (postWithSameSlug) {
        postWithSameSlug = await getNewsbySlug(`${slug}-${count}`);
        if (!postWithSameSlug) {
          slug = `${slug}-${count}`;
        }
        count++;
      }

      const data = {
        title: title[0],
        content: content[0],
        slug,
        AuthorId: userId,
        image_url: imageUpload.secure_url,
      };

      if (video) {
        const videoUpload = await cloudinaryUpload(video[0].filepath);
        data.video_url = videoUpload.secure_url;
      }

      const post = await createNews(data);

      res.json(post);
    });
  },
  getBySlug: async (req, res) => {
    const result = await getNewsbySlug(req.params.slug);
    res.json(result);
  },
  update: async (req, res) => {},
};
