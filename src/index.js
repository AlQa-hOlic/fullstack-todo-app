import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { App, Todo, AddTodo } from "./components";

import "./stylesheets/skeleton.css";
import styles from "./stylesheets/index.css";

const root = document.getElementById("root");
root.classList.add(styles.root);

render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        exact
        render={props => <App classes={styles} {...props} />}
      />
      <Route
        path="/todo/:_id"
        render={props => <Todo classes={styles} {...props} />}
      />
      <Route
        path="/add"
        render={props => <AddTodo classes={styles} {...props} />}
      />
    </Switch>
  </BrowserRouter>,
  root
);
