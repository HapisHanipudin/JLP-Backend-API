import prisma from "./index.js";

export const createOrder = async (data) => {
  return await prisma.order.create({ data });
};

export const createOrderItem = async (data) => {
  return await prisma.orderItem.create({ data });
};
