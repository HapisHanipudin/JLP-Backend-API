import prisma from "./index.js";

export const getNews = async () => {
  return await prisma.news.findMany();
};

export const createNews = async (data) => {
  return await prisma.news.create({
    data,
  });
};

export const getNewById = async (id) => {
  return await prisma.news.findUnique({
    where: {
      id,
    },
  });
};