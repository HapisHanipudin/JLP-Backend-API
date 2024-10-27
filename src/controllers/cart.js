import { createCart } from "../db/cart.js";

export default {
  post: async (req, res) => {
    const userId = req.auth.id;
    const carts = [];

    const { productIds } = req.body;

    await Promise.all(
      productIds.map(async (productId) => {
        const cart = await createCart({
          userId,
          productId,
        });
        carts.push(cart);
      })
    );

    res.json(carts);
  },
};
