import express from "express";
const router = express.Router();
import midtransClient from "midtrans-client";

// Endpoint untuk membuat transaksi
router.post('/create-transaction', async (req, res) => {
  const { orderId, grossAmount, customerDetails } = req.body;

  const snap = new midtransClient.Midtrans.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-I5EQSLwuG3BsEPgmdNkZExOY',
        clientKey : 'SB-Mid-client-UM05dNq-Mq-rYQdQ'
    });

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
});

export default router;
