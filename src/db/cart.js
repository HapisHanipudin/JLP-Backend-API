import prisma from "./index.js";

export const getCartByID = async (id) => {
  return await prisma.cart.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });
};

export const createCart = async (data) => {
  return await prisma.cart.create({ data, include: { product: true } });
};

export const deleteCart = async (id) => {
  return await prisma.cart.delete({ where: { id } });
};

export const getUserCart = async (userId) => {
  return await prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });
};
