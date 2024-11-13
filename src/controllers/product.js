import { getProducts, createProduct, getProductById } from "../db/product.js";
import formidable from "formidable";
import { cloudinaryUpload } from "../utils/cloudinary.js";

export default {
  index: async (req, res) => {},

  post: async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ success: false, message: err.message });
      }

      const { name, price, description } = fields;
      const { image } = files;

      if (!name || !price || !description || !image) {
        return res.status(400).json({
          statusCode: 400,
          statusMessage: "Invalid Params",
        });
      }

      const vendorId = req.auth.vendorToken;
      let imageUpload;

      try {
        imageUpload = await cloudinaryUpload(image[0].filepath);
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          statusMessage: "Gagal upload gambar",
        });
      }
      try {
        const data = {
          name: name[0],
          price: parseInt(price[0], 10),
          description: description[0],
          vendorId,
          imageUrl: imageUpload.secure_url,
        };

        const post = await createProduct(data);

        res.json(post);
      } catch (error) {
        res.status(500).json({
          statusCode: 500,
          statusMessage: error.message,
        });
      }
    });
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res.json(product);
  },
};
