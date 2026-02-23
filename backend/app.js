const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Serwer działa");
});

app.get("/products", (req, res) => {
  fs.readFile("../data.json", (err, data) => {
    if (err) throw err;

    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Serwer na http://localhost:${PORT}`);
});
