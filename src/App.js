import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      page: "LOGIN",
    };
  }

  componentDidMount() {
    fetch("/check")
      .then((response) => response.json())
      .then((response) => {
        if (response == true) this.setState({ page: "HOME" });
      }),
      fetch("/api/load")
        .then((response) => response.json())
        .then((data) => {
          data.map((task, index) => {
            this.setState({
              tasks: [
                ...this.state.tasks,
                {
                  id: task._id,
                  title: task.title,
                  description: task.description,
                },
              ],
            });
          });
        });
  }

  handleNewUser = (username, password) => {
    fetch("/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == "200") {
          alert("Se ha registrado satisfactoriamente.");
          this.setState({ page: "LOGIN" });
        }
      });
  };

  handleLogin = (username, password) => {
    fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response == "200") this.setState({ page: "HOME" });
        else alert("Usuario o contraseña incorrecta.");
      });
  };

  handleRegister = () => {
    this.setState({ page: "REGISTER" });
  };

  handleSubmit = (title, description) => {
    fetch("/api/save", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response !== "404") {
          this.setState({
            tasks: [
              ...this.state.tasks,
              { title: title, description: description, id: response },
            ],
          });
        } else alert("Ha ocurrido un error al guardar la nueva tarea.");
      });
  };

  handleDelete = (id) => {
    fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((status) => {
        if (status == "200") {
          const newTasksState = [...this.state.tasks];

          newTasksState.map((task, index) => {
            if (task.id === id) {
              newTasksState.splice(index, 1);
              this.setState({ tasks: newTasksState });
            }
          });
        } else alert("Ha ocurrido un error al eliminar la nueva tarea.");
      });
  };

  render() {
    return (
      <main>
        {this.state.page === "LOGIN" ? (
          <Login onLogin={this.handleLogin} onRegister={this.handleRegister} />
        ) : this.state.page === "HOME" ? (
          <div>
            <TaskForm onSubmit={this.handleSubmit} />
            <hr />
            <div className="row m-2">
              {this.state.tasks.map((task, index) => {
                return (
                  <Task
                    task={task}
                    key={index}
                    id={task.id}
                    onDelete={this.handleDelete}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <Register onSubmitRegister={this.handleNewUser} />
        )}
      </main>
    );
  }
}

export default App;
