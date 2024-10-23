import { getProducts, createProduct, getProductById } from "../db/product.js";
import formidable from "formidable";
import { cloudinaryUpload } from "../utils/cloudinary.js";

export default {
  post: async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      }

      const { name, price, description } = fields;
      const { image } = files;

      console.log(req.auth);

      const vendorId = req.auth.vendorToken;

      const imageUpload = await cloudinaryUpload(image[0].filepath);

      const data = {
        name: name[0],
        price: parseInt(price[0], 10),
        description: description[0],
        vendorId,
        imageUrl: imageUpload.secure_url,
      };

      const post = await createProduct(data);

      res.json(post);
    });
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res.json(product);
  },
};
