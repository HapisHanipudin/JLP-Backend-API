import { createNews, getNews, getNewById } from "../db/news";
import formidable from "formidable";
import { cloudinaryUpload } from "../utils/cloudinary";

export default {
  index: async (req, res) => {
    const news = await getNews();
    res.send(news);
  },
  create: async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send("Error parsing the form");
      }

      try {
        const file = files.profileImage.path; // Ambil path file yang diunggah
        const result = await cloudinaryUpload(file); // Unggah file ke Cloudinary
        res.json({ success: true, url: result.secure_url }); // Kirim URL gambar yang diunggah ke klien
      } catch (error) {
        res.status(500).send(`Upload error: ${error.message}`);
      }
    });
    const newItem = await createNews(req.body);
    res.json(newItem);
  },
  getById: async (req, res) => {
    const result = await getNewById(req.params.id);
    res.json(result);
  },
  update: async (req, res) => {},
};
