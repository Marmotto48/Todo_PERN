const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
// create todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});
// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error);
  }
});
// get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    const todoID = req.params["id"];
    const todo = await pool.query("SELECT * FROM todo WHERE todoid = $1", [
      todoID,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.error(error);
  }
});
// update a todo
app.put("/todo/:id", async (req, res) => {
  try {
    const todoID = req.params["id"];
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todoid = $2",
      [description, todoID]
    );
    res.json(updateTodo.rows);
  } catch (error) {
    console.error(error);
  }
});
// delete todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const todoID = req.params["id"];
    const deleteTodo = await pool.query("DELETE FROM todo  WHERE todoid = $1", [
      todoID,
    ]);
    res.json(deleteTodo.rows);
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
