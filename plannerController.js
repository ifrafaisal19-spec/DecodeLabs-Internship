const { readData, writeData } = require("../data/fileHelper");
const FILE_NAME = "planner.json";

// GET /planner - returns all planner entries
function getAllPlans(req, res) {
  try {
    const plans = readData(FILE_NAME);
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: "Could not read planner data." });
  }
}

// POST /planner - adds a new planner entry
function createPlan(req, res) {
  try {
    const plans = readData(FILE_NAME);

    const newPlan = {
      id: Date.now(),
      day: req.body.day,
      activity: req.body.activity
    };

    plans.push(newPlan);
    writeData(FILE_NAME, plans);

    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: "Could not save planner entry." });
  }
}

module.exports = { getAllPlans, createPlan };
