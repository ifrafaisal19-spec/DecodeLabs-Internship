const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "tasks.json";

// GET /tasks - returns all tasks
function getAllTasks(req, res) {
  try {
    const tasks = readData(FILE_NAME);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not read tasks data." });
  }
}

// POST /tasks - adds a new task
function createTask(req, res) {
  try {
    const tasks = readData(FILE_NAME);

    const newTask = {
      id: Date.now(),
      title: req.body.title,
      priority: req.body.priority,
      completed: false
    };

    tasks.push(newTask);
    writeData(FILE_NAME, tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Could not save task." });
  }
}

module.exports = { getAllTasks, createTask };
