import prisma from "./index.js";

export const createVendor = async (data) => {
  return await prisma.vendor.create({
    data,
  });
};

export const getVendors = async () => {
  return await prisma.vendor.findMany({
    include: {
      category: true,
      reviews: true,
    },
  });
};

export const getVendorDetailBySlug = async (slug) => {
  return await prisma.vendor.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      contacts: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
        },
      },
      banners: true,
      reviews: {
        take: 3,
        include: {
          user: true,
        },
      },
    },
  });
};

export const getVendorBySlug = async (slug) => {
  return await prisma.vendor.findUnique({
    where: {
      slug,
    },
  });
};

export const getVendorByCategory = async (slug) => {
  return await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      vendors: {
        include: {
          category: true,
          reviews: true,
        },
      },
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

export const getVendorById = async (id) => {
  return await prisma.vendor.findUnique({
    where: {
      id,
    },
  });
};

export const getVendorDetailById = async (id) => {
  return await prisma.vendor.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      contacts: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
        },
      },
      banners: true,
      reviews: {
        take: 3,
        include: {
          user: true,
        },
      },
    },
  });
};
