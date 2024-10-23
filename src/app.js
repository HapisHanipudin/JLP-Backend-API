import express from "express";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.js";

import vendorRoute from "./routes/vendor.js";
import newsRoute from "./routes/news.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import reviewRoute from "./routes/review.js";
import devRoute from "./routes/dev.js";

import os from "os";
const app = express();
const port = 3000;

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

app.use("/vendor", vendorRoute);
app.use("/news", newsRoute);
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/review", reviewRoute);
app.use("/dev", devRoute);

app.listen(port, "0.0.0.0", function () {
  console.log(`Server running on http://${ipAddress}:${port}`);
});
