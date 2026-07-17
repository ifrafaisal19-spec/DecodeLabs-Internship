const express = require("express");
const router = express.Router();

const { getAllExams, createExam } = require("../controllers/examsController");
const { validateExam } = require("../middleware/validate");

router.get("/", getAllExams);
router.post("/", validateExam, createExam);

module.exports = router;
