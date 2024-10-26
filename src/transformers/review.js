import human from "human-time";
import { userTransformer } from "./user.js";

export const reviewTransformer = (review) => {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    created: human(review.createdAt),
    user: userTransformer(review.user),
  };
};
