import { snap } from "../utils/midtrans.js";
export default {
  index: async (req, res) => {
    const { orderId, grossAmount, customerDetails } = req.body;

    // Data parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: orderId, // Harus unik setiap transaksi
        gross_amount: grossAmount,
      },
      customer_details: customerDetails, // Nama, email, dll
    };

    try {
      // Buat transaction token menggunakan Snap
      const transaction = await snap.createTransaction(parameter);
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
