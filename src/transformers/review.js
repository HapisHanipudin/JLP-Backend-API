import human from "human-time";
import { userTransformer } from "./user.js";
import cart from "../controllers/cart.js";
import { productTransformer, vendorTransformer } from "./vendor.js";

export const reviewTransformer = (review) => {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    created: human(review.createdAt),
    user: userTransformer(review.user),
  };
};

export const cartTransformer = (cart) => {
  return {
    id: cart.id,
    productId: cart.productId,
    quantity: cart.quantity,
    note: cart.note,
    product: productTransformer(cart.product),
    vendor: vendorTransformer(cart.product.vendor),
  };
};
