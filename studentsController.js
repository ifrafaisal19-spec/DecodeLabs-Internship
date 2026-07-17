const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "students.json";

// GET /students - returns all students
function getAllStudents(req, res) {
  try {
    const students = readData(FILE_NAME);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Could not read students data." });
  }
}

// POST /students - adds a new student (validated in middleware before this runs)
function createStudent(req, res) {
  try {
    const students = readData(FILE_NAME);

    const newStudent = {
      id: Date.now(),
      name: req.body.name,
      semester: req.body.semester,
      cgpa: req.body.cgpa
    };

    students.push(newStudent);
    writeData(FILE_NAME, students);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Could not save student." });
  }
}

module.exports = { getAllStudents, createStudent };
