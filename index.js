const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
  date: Date,
  user: String,
});

var UserSchema = new Schema({
  username: String,
  password: String,
});

var Task = mongoose.model("Task", TaskSchema);
var User = mongoose.model("User", UserSchema);

// Passport
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user) {
          if (user.password == password) return done(null, user);
          else return done(null, false);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  session({
    secret: "jose",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.get("/check", function (req, res) {
  res.send(req.isAuthenticated());
});

app.get("/api/load", function (req, res) {
  // User.findOne({ _id: req.user }, (err, user) => {
  //   if (err) return res.send("404");
  //   if (!user) return res.send("404");
  //   if (user) {
  //     Task.find({ user: user.username }, function (err, tasks) {
  //       if (err) return console.error(err);
  //       res.send(JSON.stringify(tasks));
  //     });
  //   }
  // });

  Task.find(function (err, tasks) {
    if (err) return console.error(err);
    res.send(JSON.stringify(tasks));
  });
});

app.get("/failed", function (req, res) {
  res.send("401");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/failed" }),
  (req, res) => {
    res.send("200");
  }
);

app.get("/logout", function (req, res) {
  console.log("Logging out");
  req.logout();
  res.send("200");
});

app.post("/register", function (req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.error(err);
      return res.send("404");
    }
    if (user) res.send("409");
    if (!user) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      newUser.save(function (err, newUser) {
        if (err) {
          console.error(err);
          return res.send("404");
        } else res.send("200");
      });
    }
  });
});

app.post("/api/save", function (req, res) {
  date = new Date();

  User.findOne({ _id: req.user }, (err, user) => {
    if (err) return res.send("404");
    if (!user) return res.send("404");
    if (user) {
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        user: user.username,
        date: date,
      });

      newTask.save(function (err, newTask) {
        if (err) {
          console.error(err);
          return res.send("404");
        } else res.send(JSON.stringify({ code: "200", taskId: newTask._id, user: newTask.user, date: newTask.date }));
      });
    }
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

app.listen(4000, () => console.log("Port: 4000"));
