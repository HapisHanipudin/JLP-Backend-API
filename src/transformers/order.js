import { productTransformer } from "./vendor.js";

export const trackOrderTransformer = (item) => {
  return {
    id: item.id,
    orderId: item.orderId,
    product: productTransformer(item.product),
    customer: item.order.owner.name,
    departure: item.product.vendor.address,
    status: item.status,
  };
};
