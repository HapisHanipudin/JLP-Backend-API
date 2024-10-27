import { getCartByID } from "../db/cart.js";
import { createOrder, createOrderItem, updateOrder } from "../db/order.js";

export default {
  post: async (req, res) => {
    const { cartIds } = req.body;
    const items = [];
    let totalPrice = 0;

    cartIds.forEach(async (cartId) => {
      const cart = await getCartByID(cartId);
      totalPrice += cart.product.price * cart.quantity;
      items.push(cart);
    });

    const orderData = {
      userId: req.auth.id,
      totalAmount: totalPrice,
    };

    const order = await createOrder(orderData);

    items.forEach(async (item) => {
      await createOrderItem({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        totalPrice: item.product.price * item.quantity,
        note: item.note,
      });
    });

    // Data parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: order.id, // Harus unik setiap transaksi
        gross_amount: totalPrice,
      },
      customer_details: {
        first_name: req.auth.name.split(" ")[0],
        last_name: req.auth.name.split(" ")[1] ? req.auth.name.split(" ")[1] : NULL,
        email: req.auth.email,
      }, // Nama, email, dll
    };

    try {
      // Buat transaction token menggunakan Snap
      const transaction = await snap.createTransaction(parameter);
      await updateOrder(order.id, {
        paymentUrl: transaction.redirect_url,
      });

      res.json({
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
