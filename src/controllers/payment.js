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
    const { transaction_status: status, order_id } = req.body;

    if (!status || !order_id) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const order = await getOrderById(order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const newOrder = {};

    if (order.status === "PENDING") {
      if (status === "settlement" || status === "capture") {
        newOrder.status = "PAID";
      } else if (status === "deny" || status === "cancel") {
        newOrder.status = "CANCELLED";
      } else if (status === "expire") {
        newOrder.status = "FAILED";
      }

      const updatedOrder = await updateOrder(order.id, newOrder);
      let updatedItems = [];

      if (!updatedOrder) {
        return res.status(500).json({ error: "Failed to update order" });
      } else {
        const newItem = {};
        if (status === "settlement" || status === "capture") {
          newItem.status = "PAID";
        } else if (status === "deny" || status === "cancel") {
          newItem.status = "CANCELLED";
        } else if (status === "expire") {
          newItem.status = "FAILED";
        }
        updatedItems = await updateOrderItems(updatedOrder.id, newItem);
      }

      updatedOrder.items = updatedItems;

      return res.json(updatedOrder);
    }

    res.json({ message: "nothing happen" });
  },
};
