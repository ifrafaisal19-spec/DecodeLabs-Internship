const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "pomodoro.json";

// GET /pomodoro - returns all pomodoro sessions
function getAllSessions(req, res) {
  try {
    const sessions = readData(FILE_NAME);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Could not read pomodoro data." });
  }
}

// POST /pomodoro - logs a new pomodoro session
function createSession(req, res) {
  try {
    const sessions = readData(FILE_NAME);

    const newSession = {
      id: Date.now(),
      task: req.body.task,
      duration: req.body.duration,
      completedAt: new Date().toISOString()
    };

    sessions.push(newSession);
    writeData(FILE_NAME, sessions);

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: "Could not save pomodoro session." });
  }
}

module.exports = { getAllSessions, createSession };
