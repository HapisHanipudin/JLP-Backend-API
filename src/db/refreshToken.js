import prisma from './index.js';

export const createRefreshToken = (data) => {
    return prisma.refreshToken.create({
        data
    })
}