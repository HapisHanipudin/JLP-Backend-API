import { createCart, getUserCart } from "../db/cart.js";
import { cartTransformer } from "../transformers/review.js";

export default {
  index: async (req, res) => {},
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
  getUserCart: async (req, res) => {
    const userId = req.auth.id;

    const userCart = await getUserCart(userId);

    if (!userCart) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "User has no item in cart",
      });
    }

    res.json(userCart.map(cartTransformer));
  },
};
