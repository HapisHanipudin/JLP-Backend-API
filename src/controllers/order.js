import { deleteCart, getCartByID } from "../db/cart.js";
import { createOrder, createOrderItem, updateOrder } from "../db/order.js";
import { snap } from "../utils/midtrans.js";

export default {
  post: async (req, res) => {
    try {
      const { cartIds } = req.body;
      const carts = [];
      const items = [];
      let totalPrice = 0;

      for (const cartId of cartIds) {
        const cart = await getCartByID(cartId);
        totalPrice += cart.product.price * cart.quantity;
        carts.push(cart);
        await deleteCart(cartId);
      }

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
      });

      const paymentInformation = {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      };

      res.json({
        order: {
          ...order,
          items,
        },
        paymentInformation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
