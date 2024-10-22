import prisma from "./index.js";

export const getProducts = async () => {
  return await prisma.product.findMany();
};

export const createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};