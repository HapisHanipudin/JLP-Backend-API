import express from "express";
import cookieParser from "cookie-parser";
import vendorRoute from "./routes/vendor.js";
import newsRoute from "./routes/news.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import authMiddleware from "./middleware/auth.js";
const app = express();
const port = 3000;

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

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
