import React, { Component } from "react";

class Register extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target.username.value !== "" &&
      event.target.password.value !== ""
    ) {
      this.props.onSubmitRegister(
        event.target.username.value,
        event.target.password.value
      );
    }
  };

  render() {
    return (
      <div className="row">
        <div
          className="container d-flex justify-content-center"
          style={{ marginTop: "15%" }}
        >
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="Ingrese usuario"
                value={this.state.username}
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingrese contraseña"
                value={this.state.password}
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </div>
            <button className="btn btn-dark">Registrarse</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
