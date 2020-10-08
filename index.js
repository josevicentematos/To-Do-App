const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Database
var mongoDB = "mongodb://127.0.0.1/database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Schema
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
  title: String,
  description: String,
});
var Task = mongoose.model("Task", TaskSchema);

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.json());

// Routes
app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.get("/api/load", function (req, res) {
  console.log("Loading tasks.");
  Task.find(function (err, tasks) {
    if (err) return console.error(err);
    res.send(JSON.stringify(tasks));
  });
});

app.post("/api/save", function (req, res) {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  newTask.save(function (err, newTask) {
    if (err) {
      console.error(err);
      return res.send("404");
    } else res.send("200");
  });
});

app.delete("/api/delete", function (req, res) {
  Task.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.error(err);
      return res.send("404");
    } else res.send("200");
  });
});

app.listen(3000, () => console.log("Port: 3000"));
