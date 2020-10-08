import React, { Component } from "react";

class TaskForm extends Component {
  state = {
    title: "",
    description: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target.title.value !== "" &&
      event.target.description.value !== ""
    ) {
      this.props.onSubmit(
        event.target.title.value,
        event.target.description.value
      );
    } else {
      alert("No puede ingresar valores vacios.");
    }

    this.setState({ title: "", description: "" });
  };

  render() {
    return (
      <div className="container mt-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Ingrese título"
              value={this.state.title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Ingrese descripción"
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Agregar
          </button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
