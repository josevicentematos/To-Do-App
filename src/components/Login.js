import React, { Component } from "react";

class Login extends Component {
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
      this.props.onLogin(
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
            <button
              onClick={(event) => this.props.onRegister()}
              className="btn btn-dark"
            >
              Registrarse
            </button>
            <button type="submit" className="btn btn-dark">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
