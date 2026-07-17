const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "notes.json";

// GET /notes - returns all notes
function getAllNotes(req, res) {
  try {
    const notes = readData(FILE_NAME);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Could not read notes data." });
  }
}

// POST /notes - adds a new note
function createNote(req, res) {
  try {
    const notes = readData(FILE_NAME);

    const newNote = {
      id: Date.now(),
      title: req.body.title,
      subject: req.body.subject,
      content: req.body.content
    };

    notes.push(newNote);
    writeData(FILE_NAME, notes);

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Could not save note." });
  }
}

module.exports = { getAllNotes, createNote };
