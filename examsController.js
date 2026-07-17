const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "exams.json";

// GET /exams - returns all exams
function getAllExams(req, res) {
  try {
    const exams = readData(FILE_NAME);
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Could not read exams data." });
  }
}

// POST /exams - adds a new exam
function createExam(req, res) {
  try {
    const exams = readData(FILE_NAME);

    const newExam = {
      id: Date.now(),
      subject: req.body.subject,
      date: req.body.date,
      syllabus: req.body.syllabus
    };

    exams.push(newExam);
    writeData(FILE_NAME, exams);

    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: "Could not save exam." });
  }
}

module.exports = { getAllExams, createExam };
