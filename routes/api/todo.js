const express = require("express");
var route = express.Router();

const Todo = require("../../models/Todo");

//get {id?}
route.get("/", (req, res) => {
  Todo.find().then(todos =>
    res.json({
      success: true,
      data: todos
    })
  );
});

route.get("/:_id", (req, res) => {
  Todo.findById(req.params._id)
    .then(todo => {
      res.json({
        success: true,
        data: todo
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        success: false,
        data: null
      });
    });
});

//delete {_id!}
route.delete("/", (req, res) => {
  Todo.deleteOne(req.body.id)
    .then(todo => {
      res.json({ success: true, data: todo });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        success: false,
        data: null
      });
    });
});

//post {_id!,completed?}
route.post("/", (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.body._id },
    { completed: req.body.completed },
    { new: true }
  )
    .then(resData => {
      console.log(resData);
      res.json({
        success: true,
        msg: "Todo Updated!",
        data: resData
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        msg: "Failed",
        data: null
      });
    });
});

//put {title!,description?}
route.put("/", (req, res) => {
  if (!req.body.title) {
    res.json({ success: false, msg: "Todo Title cannot be Empty!" });
  }
  newTodo = new Todo({
    title: req.body.title,
    description: req.body.description || ""
  });
  Todo.find({ title: req.body.title }).then(todo => {
    if (todo.length !== 0) {
      console.log("found: " + todo);
      res.json({
        success: false,
        msg: "Cant add duplicate Todo",
        data: newTodo
      });
    } else {
      newTodo.save().then(
        res.json({
          success: true,
          msg: "Todo Added!",
          data: newTodo
        })
      );
    }
  });
});

module.exports = route;
