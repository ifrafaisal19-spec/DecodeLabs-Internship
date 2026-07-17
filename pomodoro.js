const express = require("express");
const router = express.Router();

const { getAllSessions, createSession } = require("../controllers/pomodoroController");
const { validatePomodoro } = require("../middleware/validate");

router.get("/", getAllSessions);
router.post("/", validatePomodoro, createSession);

module.exports = router;
