import { createNews, getNews, getNewById } from "../db/news.js";
import formidable from "formidable";
import { cloudinaryUpload } from "../utils/cloudinary.js";

export default {
  index: async (req, res) => {
    const news = await getNews();
    res.send(news);
  },
  create: (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      }

      const { title, content } = fields;
      const { image } = files;

      const slug = title[0]
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/\s/g, "-");
      const data = {
        title: title[0],
        content: content[0],
        slug,
      };

      res.json({ title, content, image: image.path });
    });
  },
  getById: async (req, res) => {
    const result = await getNewById(req.params.id);
    res.json(result);
  },
  update: async (req, res) => {},
};
