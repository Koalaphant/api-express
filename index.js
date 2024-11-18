const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the home page" });
});

app.get("/users", (req, res) => {
  fs.readFile("./data/users.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);

    res.status(200).json(parsedData);
  });
});

app.post("/users", (req, res) => {
  console.log(req.body);

  res.status(200).send("lol");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
