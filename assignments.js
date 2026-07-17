const express = require("express");
const router = express.Router();

const { getAllAssignments, createAssignment } = require("../controllers/assignmentsController");
const { validateAssignment } = require("../middleware/validate");

router.get("/", getAllAssignments);
router.post("/", validateAssignment, createAssignment);

module.exports = router;
