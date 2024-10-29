import prisma from "./index.js";

export const createOrder = async (data) => {
  return await prisma.order.create({ data });
};

export const updateOrder = async (id, data) => {
  return await prisma.order.update({
    where: {
      id,
    },
    data,
  });
};

export const createOrderItem = async (data) => {
  return await prisma.orderItem.create({ data });
};

export const getUserOrder = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
};

export const getUserOrderByStatus = async (userId, status) => {
  return await prisma.order.findMany({
    where: {
      userId,
      status,
    },
    include: {
      items: true,
    },
  });
};