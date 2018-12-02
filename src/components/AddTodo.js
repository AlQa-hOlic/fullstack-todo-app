import React from "react";

class AddTodo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      loading: false,
      accepted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit() {
    this.setState({ loading: true });
    fetch("https://my-first-fullstack-todo-app.herokuapp.com/api/todo", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    }).then(res =>
      res.json().then(resData => {
        console.log(resData);
        setTimeout(() => this.props.history.push("/"), 3000);
      })
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        {!this.state.loading && (
          <div className={classes.todoCard}>
            <h1 className={classes.heading}>Title</h1>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Enter a Todo title.."
            />
            <h1 className={classes.subheading}>Description</h1>
            <input
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Enter a Todo description.."
            />
            <div className={classes.grow} />
            <div className={classes.actions}>
              <button onClick={this.handleSubmit} className={classes.button}>
                Add Todo
              </button>
            </div>
          </div>
        )}
        {this.state.loading &&
          (!this.state.accepted && (
            <h3 className={classes.subheading}>loading...</h3>
          ))}
        {this.state.loading &&
          (this.state.accepted && (
            <h3 className={classes.subheading}>Todo is Added!</h3>
          ))}
      </>
    );
  }
}
export default AddTodo;
