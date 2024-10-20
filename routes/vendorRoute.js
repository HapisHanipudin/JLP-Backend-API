import express from "express";
const router = express.Router();

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

router
  .route("/")
  .get((req, res) => {
    res.json(vendors);
  })
  .post((req, res) => {
    const body = req.body;
    vendors.push(body);
    res.json(vendors);
  });

router.route("/:id").get((req, res) => {
  const item = vendors.filter();
});

export default router;
