const express = require("express");
const router = express.Router();

const { getAllStudents, createStudent } = require("../controllers/studentsController");
const { validateStudent } = require("../middleware/validate");

router.get("/", getAllStudents);
router.post("/", validateStudent, createStudent);

module.exports = router;
