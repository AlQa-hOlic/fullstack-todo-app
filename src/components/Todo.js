import React from "react";
import classNames from "classnames";

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleCompletedButtonClick = this.handleCompletedButtonClick.bind(
      this
    );
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }
  componentDidMount() {
    fetch(
      "https://my-first-fullstack-todo-app.herokuapp.com/api/todo/" +
        this.props.match.params._id
    ).then(res => {
      res.json().then(data => {
        this.setState({ ...data, loading: false });
      });
    });
  }
  handleCompletedButtonClick() {
    this.setState({ loading: true });
    fetch("https://my-first-fullstack-todo-app.herokuapp.com/api/todo/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: this.state.data._id,
        completed: !this.state.data.completed,
        description: this.state.description
      })
    }).then(res =>
      res.json().then(resData => {
        console.log(resData);
        this.setState({
          data: resData.data,
          loading: false
        });
      })
    );
  }
  handleDeleteButtonClick() {
    this.setState({ loading: true });
    fetch("https://my-first-fullstack-todo-app.herokuapp.com/api/todo/", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: this.state.data._id
      })
    }).then(res =>
      res.json().then(resData => {
        console.log(resData);
        this.props.history.push("/");
      })
    );
  }
  render() {
    const { classes } = this.props;
    const { loading, data } = this.state;
    var cx = classNames.bind(classes);
    return (
      <>
        {loading && <h3 className={classes.subheading}>loading...</h3>}
        {!loading && (
          <>
            <div className={classes.todoCard}>
              <h1 className={classes.heading}>{data.title}</h1>
              <h3 className={classes.subheading}>{data.description}</h3>
              <div className={classes.grow} />
              <div className={classes.actions}>
                <button
                  onClick={this.handleDeleteButtonClick}
                  className={classes.deleteButton}
                >
                  delete
                </button>
                <button
                  onClick={this.handleCompletedButtonClick}
                  className={classNames(classes.completedButton, {
                    [classes.true]: data.completed,
                    [classes.false]: !data.completed
                  })}
                >
                  {"completed: " + data.completed}
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Todo;
