const express = require("express");
const router = express.Router();

const { getAllPlans, createPlan } = require("../controllers/plannerController");
const { validatePlanner } = require("../middleware/validate");

router.get("/", getAllPlans);
router.post("/", validatePlanner, createPlan);

module.exports = router;
