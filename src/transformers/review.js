import human from "human-time";
import { userTransformer } from "./user.js";

export const reviewTransformer = (review) => {
  return {
    id: review.id,
    stars: review.stars,
    comment: review.comment,
    created: human(review.createdAt),
    user: userTransformer(review.user),
  };
};
