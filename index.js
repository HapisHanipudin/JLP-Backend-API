import express from "express";
import vendorRoute from "./routes/vendorRoute.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/vendor", vendorRoute);

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
