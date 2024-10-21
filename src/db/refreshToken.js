import prisma from "./index.js";

export const createRefreshToken = (data) => {
  return prisma.refreshToken.create({
    data,
  });
};

export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const removeRefreshToken = (token) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
