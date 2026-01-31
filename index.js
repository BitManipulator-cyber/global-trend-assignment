const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// In-memory todos
let todos = [
  {
    id: uuidv4(),
    title: "Learn Express",
    description: "Understand routing and middleware",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Build Todo App",
    description: "Convert posts to todos",
    completed: false,
  },
];

// Redirect root
app.get("/", (req, res) => {
  res.redirect("/todos");
});

// Show all todos
app.get("/todos", (req, res) => {
  res.render("index.ejs", { todos });
});

// Form to create new todo
app.get("/todos/new", (req, res) => {
  res.render("new.ejs");
});

// Create todo
app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  todos.push({
    id: uuidv4(),
    title,
    description,
    completed: false,
  });
  res.redirect("/todos");
});

// Show single todo
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  res.render("show.ejs", { todo });
});

// Edit todo form
app.get("/todos/:id/edit", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  res.render("edit.ejs", { todo });
});

// Update todo
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = todos.find((t) => t.id === id);
  todo.title = title;
  todo.description = description;
  res.redirect("/todos");
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== id);
  res.redirect("/todos");
});

app.listen(port, () => {
  console.log(`Todo app running on http://localhost:${port}`);
});