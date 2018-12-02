import React from "react";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.pullData();
  }
  pullData() {
    fetch("http://localhost:3000/api/todo").then(res => {
      res.json().then(data => {
        this.setState({ todos: data.data, loading: false });
      });
    });
  }
  handleChange(e) {
    this.setState({
      inputs: { ...this.state.inputs, [e.target.name]: e.target.value }
    });
  }
  render() {
    const { classes } = this.props;
    const { todos, loading } = this.state;
    return (
      <>
        <h1 className={classes.heading}>Hello World!</h1>
        {loading && (
          <>
            <h3 className={classes.subheading}>loading...</h3>
            <div className={classes.todo}>{"++  Add Todo  ++"}</div>
          </>
        )}
        {!loading && (
          <>
            <TodoList todos={todos} classes={classes} />
            <Link to="/add" className={classes.todo}>
              {"++  Add Todo  ++"}
            </Link>
          </>
        )}
      </>
    );
  }
}
export default App;
