//create web server
const express = require("express");
const app = express();
//create a port
const port = 3000;
//connect to the comments.js file
const comments = require("./comments.js");
//create a route that will return all the comments
app.get("/comments", (req, res) => {
  res.json(comments);
});
//create a route that will return a single comment
app.get("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  res.json(comment);
});
//start the server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});