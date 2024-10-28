import { createCart } from "../db/cart.js";

export default {
  post: async (req, res) => {
    const userId = req.auth.id;
    const carts = [];

    const { products } = req.body;
    if (!products) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Invalid params",
      });
    }

    await Promise.all(
      products.map(async (product) => {
        const cart = await createCart({
          userId,
          productId: product.productId,
          quantity: product.quantity,
          note: product.note ? product.note : null,
        });
        carts.push(cart);
      })
    );

    res.json(carts);
  },
};
