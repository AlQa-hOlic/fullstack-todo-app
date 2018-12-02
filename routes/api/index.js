const express = require("express");
var route = express.Router();

route.get("/", (req, res) => {
  res.send("api works here..");
});

const todo_api_route = require("./todo");
route.use("/todo", todo_api_route);

module.exports = route;
