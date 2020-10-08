import React, { Component } from "react";

class Task extends Component {
  render() {
    return (
      <div className="card col-sm-3 m-2">
        <div className="card-body">
          <label className="font-weight-bold">{this.props.task.title}</label>
          <br />
          <label className="card-text">{this.props.task.description}</label>
        </div>
        <p></p>
        <button
          id={this.props.id}
          type="button"
          className="btn btn-dark m-2"
          onClick={() => this.props.onDelete(event.target.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Task;
