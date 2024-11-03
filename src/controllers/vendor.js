import formidable from "formidable";
import { createVendor, getVendors, getVendorDetailBySlug, getVendorByCategory, updateVendor, getVendorBySlug, getVendorById, getVendorDetailById } from "../db/vendor.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { updateUser } from "../db/user.js";
import { vendorDetailTransformer, vendorTransformer } from "../transformers/vendor.js";
import { getCategory } from "../db/category.js";
import { getVendorProduct } from "../db/product.js";

// const vendors = [
//   {
//     id: 1,
//     name: "Bakpia Juara",
//     address: "gatau dimana",
//   },
//   {
//     id: 2,
//     name: "Bakpia Jawara",
//     address: "gatau dimana",
//   },
// ];

export default {
  index: async (req, res) => {
    const vendors = await getVendors();
    res.send(vendors.map(vendorTransformer));
  },

  create: async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      }

      const { name, categoryId, description, gmapsUrl, openingHours, closingHours, address } = fields;
      const { icon } = files;

      if (!name || !categoryId || !description || !gmapsUrl || !openingHours || !closingHours || !address || !icon) {
        return res.status(400).json({
          statusCode: 400,
          statusMessage: "Invalid Params",
        });
      }

      let slug = name[0]
        .toLocaleLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s/g, "-");

      let count = 1;
      let vendorWithSameSlug = await getVendorBySlug(slug);

      while (vendorWithSameSlug) {
        // console.log(`Slug with count: ${slug}-${count}`);
        vendorWithSameSlug = await getVendorBySlug(`${slug}-${count}`);
        if (!vendorWithSameSlug) {
          slug = `${slug}-${count}`;
        }
        count++;
      }

      const iconUrl = await cloudinaryUpload(icon[0].filepath);
      // console.log(`Slug: ${slug}`);

      const data = {
        name: name[0],
        categoryId: categoryId[0],
        description: description[0],
        openingHours: openingHours[0],
        closingHours: closingHours[0],
        gmapsUrl: gmapsUrl[0],
        address: address[0],
        slug,
        iconUrl: iconUrl.secure_url,
      };

      const newVendor = await createVendor(data);

      const userId = req.auth.id;

      await updateUser(userId, { vendorToken: newVendor.id });

      res.json(newVendor);
    });
  },
  getBySlug: async (req, res) => {
    const result = await getVendorDetailBySlug(req.params.slug);
    res.json(vendorDetailTransformer(result));
  },

  update: (req, res) => {
    const vendor = getVendorById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Vendor was not found",
      });
    }

    const result = updateVendor(req.params.id, req.body);
    return result;
  },
  getByCategory: async (req, res) => {
    console.log(req.params.category);
    const category = await getCategory(req.params.category);

    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Category was not found",
      });
    }

    const result = await getVendorByCategory(req.params.category);
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Data was not found",
      });
    }
    const data = {
      ...result,
      vendors: result.vendors.map(vendorTransformer),
    };
    res.json(data);
  },
  getProducts: async (req, res) => {
    const vendor = await getVendorBySlug(req.params.slug);
    if (!vendor) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Vendor was not found",
      });
    }
    const result = await getVendorProduct(vendor.id);
    res.json(result);
  },
  getVendorById: async (req, res) => {
    const result = await getVendorDetailById(req.params.id);
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Vendor was not found",
      });
    }
    res.json(vendorDetailTransformer(result));
  },
};
