import { getOrderById, updateOrder, updateOrderItems } from "../db/order.js";
import { snap } from "../utils/midtrans.js";
export default {
  index: async (req, res) => {
    const { id, productName, price, quantity } = req.body;

    // Data parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: id, // Harus unik setiap transaksi
        gross_amount: price * quantity,
      },
      item_details: [
        {
          id: "ITEM1",
          price: price,
          quantity: quantity,
          name: productName,
        },
      ],
    };

    try {
      // Buat transaction token menggunakan Snap
      const transaction = await snap.createTransaction(parameter);
      res.json({
        token: transaction.token,
        payment_url: transaction.redirect_url,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  confirmation: async (req, res) => {
    const body = req.body;

    const order = await getOrderById(body.order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const newOrder = {};

    if (order.status === "PENDING") {
      if (body.status === "settlement" || body.status === "capture") {
        newOrder.status = "PAID";
      } else if (body.status === "deny" || body.status === "cancel") {
        newOrder.status = "CANCELLED";
      } else if (body.status === "expire") {
        newOrder.status = "FAILED";
      }

      const updatedOrder = await updateOrder(order.id, newOrder);
      let updatedItems;

      if (!updatedOrder) {
        return res.status(500).json({ error: "Failed to update order" });
      } else {
        const newItem = {};
        if (body.status === "settlement" || body.status === "capture") {
          newItem.status = "PAID";
        } else if (body.status === "deny" || body.status === "cancel") {
          newItem.status = "CANCELLED";
        } else if (body.status === "expire") {
          newItem.status = "FAILED";
        }
        updatedItems = await updateOrderItems(updatedOrder.id, newItem);
      }

      return res.json(updatedOrder);
    }

    res.json({ message: "nothing happen" });
  },
};
