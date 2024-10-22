import { createVendor, getVendors, getVendorByID, getVendorByCategory, updateVendor, getVendorBySlug } from "../db/vendor.js";

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
    res.send(vendors);
  },

  create: async (req, res) => {
    let slug = req.body.name
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
    // console.log(`Slug: ${slug}`);

    const data = {
      ...req.body,
      slug,
    };

    const newItem = await createVendor(data);
    res.json(newItem);
  },
  getById: async (req, res) => {
    const result = await getVendorByID(req.params.id);
    res.json(result);
  },
  update: (req, res) => {
    const result = updateVendor(req.params.id, req.body);
    return result;
  },
  getByCategory: async (req, res) => {
    const result = await getVendorByCategory(req.params.category);
    res.json(result);
  },
};
