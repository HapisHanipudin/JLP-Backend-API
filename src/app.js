import express from "express";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.js";

import vendorRoute from "./routes/vendor.js";
import newsRoute from "./routes/news.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import reviewRoute from "./routes/review.js";
import devRoute from "./routes/dev.js";
import paymentRoute from "./routes/payment.js";
import orderRoute from "./routes/order.js";
import cartRoute from "./routes/cart.js";

import os from "os";
const app = express();
const port = 8000;

const getLocalIP = () => {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaceInfo = networkInterfaces[interfaceName];
    for (const info of interfaceInfo) {
      if (info.family === "IPv4" && !info.internal) {
        return info.address;
      }
    }
  }
};

const ipAddress = getLocalIP();

app.use(authMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/vendor", vendorRoute);
app.use("/product", productRoute);
app.use("/review", reviewRoute);
app.use("/order", orderRoute);
app.use("/cart", cartRoute);
app.use("/dev", devRoute);

// Tambahkan route pembayaran
app.use("/api/payment", paymentRoute);

app.listen(port, "0.0.0.0", console.log(`Server running on Port ${port}`));
