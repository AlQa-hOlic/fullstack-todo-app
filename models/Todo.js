const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  }
});

module.exports = Todo = mongoose.model("todos", TodoSchema);
