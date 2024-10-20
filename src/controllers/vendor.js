import { createVendor, getVendors, getVendorByID, getVendorByCategory } from "../db/vendor.js";

const vendors = [
  {
    id: 1,
    name: "Bakpia Juara",
    address: "gatau dimana",
  },
  {
    id: 2,
    name: "Bakpia Jawara",
    address: "gatau dimana",
  },
];

export default {
  index: async (req, res) => {
    const vendorsss = await getVendors();
    console.log(vendorsss);
    res.send(vendorsss);
  },

  create: async (req, res) => {
    const newItem = await createVendor(req.body);
    res.json(newItem);
  },
  getById: async (req, res) => {
    const result = await getVendorByID(req.params.id);
    res.json(result);
  },
  uodate: (req, res) => {
    const result = vendors.find((item) => item.id == req.params.id);
    if (result) {
      if (req.body.name) result.name = req.body.name;
      if (req.body.address) result.address = req.body.address;
      res.json(vendors);
    } else {
      res.errored;
    }
  },
  getByCategory: async (req, res) => {
    const result = await getVendorByCategory(req.params.category);
    res.json(result);
  },
};
