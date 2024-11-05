import prisma from "./index.js";

export const createReview = async (data) => {
  return await prisma.reviews.create({
    data,
    include: {
      user: true,
    },
  });
};

export const getReviewByVendorId = async (vendorId) => {
  return await prisma.reviews.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      vendorId,
    },
    include: {
      user: true,
    },
  });
};
