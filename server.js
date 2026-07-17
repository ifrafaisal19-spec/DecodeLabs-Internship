const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Allows the frontend (running on a different origin/port) to call this API
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Route files
const studentsRoutes = require("./routes/students");
const assignmentsRoutes = require("./routes/assignments");
const notesRoutes = require("./routes/notes");
const tasksRoutes = require("./routes/tasks");
const examsRoutes = require("./routes/exams");
const pomodoroRoutes = require("./routes/pomodoro");
const plannerRoutes = require("./routes/planner");

// Mounting routes
app.use("/students", studentsRoutes);
app.use("/assignments", assignmentsRoutes);
app.use("/notes", notesRoutes);
app.use("/tasks", tasksRoutes);
app.use("/exams", examsRoutes);
app.use("/pomodoro", pomodoroRoutes);
app.use("/planner", plannerRoutes);

// Simple route to check if the server is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Survival Hub API is running." });
});

// 404 handler - runs if no route above matched the request
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// General error handler - catches any unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
