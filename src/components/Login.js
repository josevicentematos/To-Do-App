import React, { Component } from "react";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <div className="container h-100 w-100">
        <div className="container d-flex justify-content-center h-100">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Ingrese usuario"
                value={this.state.username}
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Contraseña</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Ingrese contraseña"
                value={this.state.password}
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </div>
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
