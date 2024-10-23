import prisma from "./index.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  const finalData = {
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  };

  return await prisma.user.create({
    data: finalData,
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const getUserById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};
