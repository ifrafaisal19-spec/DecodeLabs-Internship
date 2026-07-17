const express = require("express");
const router = express.Router();

const { getAllNotes, createNote } = require("../controllers/notesController");
const { validateNote } = require("../middleware/validate");

router.get("/", getAllNotes);
router.post("/", validateNote, createNote);

module.exports = router;
