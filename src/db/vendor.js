import prisma from "./index.js";

export const createVendor = async (data) => {
  return await prisma.vendor.create({
    data,
  });
};

export const getVendors = async () => {
  return await prisma.vendor.findMany();
};

export const getVendorByID = async (id) => {
  return await prisma.vendor.findUnique({
    where: {
      id,
    },
  });
};

export const getVendorByCategory = async (slug) => {
  return await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      vendors: true,
    },
  });
};

export const updateVendor = async (id, data) => {
  return await prisma.vendor.update({
    where: {
      id,
    },
    data,
  });
};
