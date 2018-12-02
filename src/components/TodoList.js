import React from "react";
import { Link } from "react-router-dom";
const TodoList = ({ todos, classes }) => {
  return todos.map(todo => {
    return (
      <Link key={todo.title} to={"/todo/" + todo._id} className={classes.todo}>
        {"-- "}
        {todo.title}
        {" --"}
      </Link>
    );
  });
};

export default TodoList;
