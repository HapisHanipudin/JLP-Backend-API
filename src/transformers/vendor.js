import { reviewTransformer } from "./review.js";

export const vendorDetailTransformer = (vendorDetail) => {
  return {
    ...vendorDetail,
    reviews: vendorDetail.reviews.map(reviewTransformer),
  };
};
