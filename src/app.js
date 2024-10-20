import express, { json, urlencoded } from "express";
const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
