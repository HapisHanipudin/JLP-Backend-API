import { createReview, getReviewByVendorId } from "../db/review.js";
import { reviewTransformer } from "../transformers/review.js";

export default {
  post: async (req, res) => {
    const { stars, comment } = req.body;

    if (!stars || !comment) {
      // error
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

    res.json(reviews.map(reviewTransformer));
  },
};
