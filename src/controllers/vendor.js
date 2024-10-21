import { createVendor, getVendors, getVendorByID, getVendorByCategory, updateVendor } from "../db/vendor.js";

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
    const newItem = await createVendor(req.body);
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
