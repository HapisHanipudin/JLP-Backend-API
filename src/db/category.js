import prisma from "./index.js";

export const getCategory = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};
