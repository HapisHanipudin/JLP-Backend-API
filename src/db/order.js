import prisma from "./index.js";

export const createOrder = async (data) => {
  return await prisma.order.create({ data });
};

export const updateOrder = async (id, data) => {
  return await prisma.order.update({
    where: {
      id,
    },
    data,
    include: {
      items: true,
    },
  });
};

export const updateOrderItems = async (orderId, data) => {
  return await prisma.orderItem.updateMany({
    where: {
      orderId,
    },
    data,
  });
};

export const updateOrderItem = async (id, data) => {
  return await prisma.orderItem.update({
    where: {
      id,
    },
    data,
  });
};
export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });
};

export const getOrderItemById = async (id) => {
  return await prisma.orderItem.findUnique({
    where: {
      id,
    },
    include: {
      order: {
        include: {
          owner: true,
        },
      },
      product: {
        include: {
          vendor: true,
        },
      },
    },
  });
};

export const createOrderItems = async (data) => {
  return await prisma.orderItem.createMany({ data });
};

export const createOrderItem = async (data) => {
  return await prisma.orderItem.create({ data });
};

export const getUserOrder = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
};

export const getUserOrderByStatus = async (userId, status) => {
  return await prisma.order.findMany({
    where: {
      userId,
      status,
    },
    include: {
      items: true,
    },
  });
};

export const trackOrderItems = async (userId) => {
  return await prisma.orderItem.findMany({
    orderBy: {
      order: {
        createdAt: "desc",
      },
    },
    where: {
      order: {
        userId,
      },
    },
    include: {
      order: {
        include: {
          owner: true,
        },
      },
      product: {
        include: {
          vendor: true,
        },
      },
    },
  });
};

export const getVendorOrders = async (vendorId) => {
  return await prisma.orderItem.findMany({
    orderBy: {
      order: {
        createdAt: "desc",
      },
    },
    where: {
      product: {
        vendorId,
      },
    },
    include: {
      order: {
        include: {
          owner: true,
        },
      },
      product: {
        include: {
          vendor: true,
        },
      },
    },
  });
};
