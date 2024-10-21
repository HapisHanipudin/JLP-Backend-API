import express from "express";
import vendorRoute from "./routes/vendor.js";
import newRoute from "./routes/news.js";
import authRoute from "./routes/auth.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/vendor", vendorRoute);
app.use("/news", newRoute);
app.use("/auth", authRoute);

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
