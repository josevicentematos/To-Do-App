import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
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
      .then((status) => {
        if (status == "200") {
          this.setState({
            tasks: [
              ...this.state.tasks,
              { title: title, description: description },
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
            if (task.id == id) {
              newTasksState.splice(index, 1);
              this.setState({ tasks: newTasksState });
            }
          });
        } else alert("Ha ocurrido un error al guardar la nueva tarea.");
      });
  };

  render() {
    return (
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
    );
  }
}

export default App;