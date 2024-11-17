import { deleteCart, deleteCarts, getCartByID, getCartByIds } from "../db/cart.js";
import { createOrder, createOrderItem, createOrderItems, getUserOrder, getUserOrderByStatus, trackOrderItems, updateOrder } from "../db/order.js";
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
};
