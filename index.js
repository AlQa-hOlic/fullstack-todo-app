const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

var app = express();

app.use(cors({ origin: "http://localhost:9000" }));
//json parser
app.use(express.json());

//main app
app.use(express.static(path.resolve(__dirname, "public")));

//api
const api_route = require(path.resolve(__dirname, "routes", "api"));
app.use("/api", api_route);

mongoose
  .connect(
    require(path.resolve(__dirname, "config")).mongo_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to DATABASE..."))
  .catch(err => console.log(err));

//server starts
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});
