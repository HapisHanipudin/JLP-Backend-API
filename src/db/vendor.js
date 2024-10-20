import prisma from "./index.js";

export const createVendor = async (data) => {
  return await prisma.vendor.create({
    data,
  });
};

export const getVendors = async () => {
  return await prisma.vendor.findMany();
};
