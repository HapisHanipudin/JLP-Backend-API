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

export const getUserByEmailOrUsername = async (input) => {
  return await prisma.user.findUnique({
    where: {
      OR: [{ email: input }, { username: input }],
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
