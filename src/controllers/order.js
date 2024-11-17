import { deleteCart, deleteCarts, getCartByID, getCartByIds } from "../db/cart.js";
import { createOrder, createOrderItem, createOrderItems, getOrderById, getOrderItemById, getUserOrder, getUserOrderByStatus, trackOrderItems, updateOrder, updateOrderItem } from "../db/order.js";
import { createDonation, createIncome } from "../db/transaction.js";
import { getVendorById } from "../db/vendor.js";
import { trackOrderTransformer } from "../transformers/order.js";
import { snap } from "../utils/midtrans.js";

export default {
  index: async (req, res) => {},

  post: async (req, res) => {
    try {
      const { cartIds } = req.body;

      if (!cartIds) {
        return res.status(400).json({
          statusCode: 400,
          statusMessage: "Invalid params",
        });
      }
      const carts = [];
      const items = [];
      let totalPrice = 0;

      carts = await getCartByIds(cartIds);
      totalPrice = carts.reduce((total, cart) => total + cart.product.price * cart.quantity, 0);
      await deleteCarts(cartIds);

      const orderData = {
        userId: req.auth.id,
        totalAmount: totalPrice,
      };

      const order = await createOrder(orderData);

      // Menggunakan Promise.all untuk membuat OrderItem secara paralel
      await Promise.all(
        carts.map(async (cart) => {
          const item = await createOrderItem({
            orderId: order.id,
            productId: cart.productId,
            quantity: cart.quantity,
            price: cart.product.price,
            totalPrice: cart.product.price * cart.quantity,
            note: cart.note,
          });
          items.push(item);
        })
      );

      // Data parameter transaksi
      const parameter = {
        transaction_details: {
          order_id: order.id, // Harus unik setiap transaksi
          gross_amount: totalPrice,
        },
        customer_details: {
          first_name: req.auth.name.split(" ")[0],
          last_name: req.auth.name.split(" ")[1] || null,
          email: req.auth.email,
        },
      };

      // Buat transaction token menggunakan Snap
      const transaction = await snap.createTransaction(parameter);

      await updateOrder(order.id, {
        paymentUrl: transaction.redirect_url,
        snapToken: transaction.token,
      });

      const paymentInformation = {
        snapToken: transaction.token,
        redirect_url: transaction.redirect_url,
      };

      res.json({
        order: {
          ...order,
          paymentUrl: transaction.redirect_url,
          items,
        },
        paymentInformation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  getUserOrder: async (req, res) => {
    const userId = req.auth.id;

    const orders = await getUserOrder(userId);

    if (!orders) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "User has no transaction history",
      });
    }

    res.json(orders);
  },
  getUserOrderByStatus: async (req, res) => {
    const userId = req.auth.id;
    const status = req.params.status;

    const orders = await getUserOrderByStatus(userId, status);

    if (!orders) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "User has no transaction history",
      });
    }

    res.json(orders);
  },
  trackOrder: async (req, res) => {
    const userId = req.auth.id;

    const orderItems = await trackOrderItems(userId);

    res.json(orderItems.map(trackOrderTransformer));
  },
  updateOrder: async (req, res) => {
    const orderId = req.params.orderId;

    const { status } = req.query;

    if (status) {
      const order = await updateOrder(orderId, { status });
      return res.json(order);
    }
  },
  updateOrderItem: async (req, res) => {
    const id = req.params.id;

    const { status } = req.query;
    let updateData = {};

    let item = await getOrderItemById(id);
    if (!item) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (status) {
      const orderItem = await getOrderItemById(id);
      if (status == orderItem.status) {
        return res.status(400).json({ error: `Order has already been ${status.toLowerCase()}` });
      }
      if (status == "PROCESS" || status == "SENT" || status == "REJECTED" || status == "ARRIVED") {
        if (req.auth.vendorId !== orderItem.product.vendorId && !req.auth.isVendor) {
          return res.status(403).json({ error: "You are not authorized to update this order" });
        }
        await updateOrderItem(id, { status });

        if (status == "PROCESS") {
          const orderItems = await getOrderById(orderItem.orderId);
          const areAllSameStatus = orderItems.items.every((item) => item.status == status);
          if (areAllSameStatus) {
            await updateOrder(orderItem.orderId, { status });
          }
        }
      } else if (status == "COMPLETED" || status == "CANCELLED") {
        if (req.auth.id !== orderItem.order.userId) {
          return res.status(403).json({ error: "You are not authorized to update this order" });
        }
        await updateOrderItem(id, { status });

        const orderItems = await getOrderById(orderItem.orderId);
        const areAllSameStatus = orderItems.items.every((item) => item.status == status);
        if (areAllSameStatus) {
          const order = await updateOrder(orderItem.orderId, { status });
          if (order.status == "COMPLETED") {
            const vendor = await getVendorById(orderItem.product.vendorId);
            await createIncome({ orderId: orderItem.orderId, amount: Math.floor(order.totalAmount * (vendor.percentageVendor * 100)) / 100, vendorId: orderItem.product.vendorId });

            await createDonation({ orderId: orderItem.orderId, amount: Math.floor(order.totalAmount * (vendor.percentagePalestine * 100)) / 100, vendorId: orderItem.product.vendorId });
          }
        }
      }
      if (req.body) {
        updateData = req.body;
      }
    }
    await updateOrderItem(id, updateData);

    item = await getOrderItemById(id);
    return res.json(item);
  },
};
