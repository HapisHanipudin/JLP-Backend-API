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
  confirmation: async (req, res) => {},
};
