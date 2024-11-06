import { createReview, getReviewByVendorId } from "../db/review.js";
import { reviewTransformer } from "../transformers/review.js";

export default {
  index: async (req, res) => {},

  post: async (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Invalid Params",
      });
    }

    const result = await createReview({
      ...req.body,
      userId: req.auth.id,
      vendorId: req.params.vendorId,
    });

    res.json(result);
  },
  get: async (req, res) => {
    const vendorId = req.params.vendorId;

    const reviews = await getReviewByVendorId(vendorId);

    if (!reviews) {
      res.status(404).json({
        statusCode: 404,
        statusMessage: "Mechant was not available",
      });
    }

    res.json(reviews.map(reviewTransformer));
  },
};
