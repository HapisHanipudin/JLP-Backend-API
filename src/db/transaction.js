import prisma from "./index.js";

export const createIncome = async (data) => {
  return await prisma.income.create({
    data,
  });
};

export const createWithdraw = async (data) => {
  return await prisma.withdrawal.create({
    data,
  });
};

export const createDonation = async (data) => {
  return await prisma.donation.create({
    data,
  });
};
