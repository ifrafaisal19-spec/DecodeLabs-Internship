const express = require("express");
const router = express.Router();

const { getAllTasks, createTask } = require("../controllers/tasksController");
const { validateTask } = require("../middleware/validate");

router.get("/", getAllTasks);
router.post("/", validateTask, createTask);

module.exports = router;
