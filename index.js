const fs = require("fs");

const express = require("express");
const { error } = require("console");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/posts", (req, res) => {
  fs.readFile("data/users.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occured fetching users");
    }
    try {
      const posts = JSON.parse(data);
      res.json(posts);
    } catch (err) {
      console.error("Error parsing JSON", err);
      res.status(500).send("Error parsing JSON");
    }
  });
});

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("data/users.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      const parsedData = JSON.parse(data);

      const filteredPost = parsedData.filter((post) => post.id === id);

      if (filteredPost.length === 0) {
        return res.status(404).send({ msg: "no post found" });
      }

      const stringifiedPost = JSON.stringify(filteredPost);
      return res.status(200).send(stringifiedPost);
    } catch (err) {
      console.log(err);
    }
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  //read json file

  if (isNaN(id)) {
    res.status(500).send("Must be a valid ID");
  }

  fs.readFile("data/users.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error: ", err);
    }

    try {
      const posts = JSON.parse(data);

      const isValid = posts.find((post) => post.id === parseInt(id));

      if (!isValid) {
        console.log("Post not found");
        return res.status(404).send("Post not found");
      }

      const filteredPosts = posts.filter((post) => post.id !== parseInt(id));
      const stringifiedPosts = JSON.stringify(filteredPosts, null, 2);
      fs.writeFile("data/users.json", stringifiedPosts, (err) => {
        console.log(err);
        if (err) {
          console.log("Error writing to file");
        }
        console.log("File saved!");
        res.status(200).send(filteredPosts);
      });
    } catch (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
