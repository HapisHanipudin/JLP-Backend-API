import express from "express";
const router = express.Router();

router.route("/header").get((req, res) => {
  console.log(req.headers);
  res.json(req.headers);
});

export default router;
