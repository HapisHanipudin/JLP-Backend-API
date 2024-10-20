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
  index: (req, res) => {
    res.json(vendors);
  },
  create: (req, res) => {
    const newItem = {
      id: vendors.length + 1,
      ...req.body,
    };
    vendors.push(newItem);
    res.json(vendors);
  },
  getById: (req, res) => {
    const result = vendors.find((item) => item.id == req.params.id);
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
};
