const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "assignments.json";

// GET /assignments - returns all assignments
function getAllAssignments(req, res) {
  try {
    const assignments = readData(FILE_NAME);
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Could not read assignments data." });
  }
}

// POST /assignments - adds a new assignment
function createAssignment(req, res) {
  try {
    const assignments = readData(FILE_NAME);

    const newAssignment = {
      id: Date.now(),
      title: req.body.title,
      subject: req.body.subject,
      dueDate: req.body.dueDate,
      status: req.body.status || "pending"
    };

    assignments.push(newAssignment);
    writeData(FILE_NAME, assignments);

    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: "Could not save assignment." });
  }
}

module.exports = { getAllAssignments, createAssignment };
