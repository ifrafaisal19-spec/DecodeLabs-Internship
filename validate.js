// This file checks the request body before it reaches the controller.
// If something is missing or wrong, we send a 400 response and stop
// the request from going any further.

function validateStudent(req, res, next) {
  const { name, semester, cgpa } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required and must be text." });
  }

  if (semester === undefined || typeof semester !== "number" || semester < 1 || semester > 8) {
    return res.status(400).json({ error: "Semester is required and must be a number between 1 and 8." });
  }

  if (cgpa === undefined || typeof cgpa !== "number" || cgpa < 0 || cgpa > 4) {
    return res.status(400).json({ error: "CGPA is required and must be a number between 0 and 4." });
  }

  next();
}

function validateAssignment(req, res, next) {
  const { title, subject, dueDate } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be text." });
  }

  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return res.status(400).json({ error: "Subject is required and must be text." });
  }

  if (!dueDate || typeof dueDate !== "string" || isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ error: "Due date is required and must be a valid date." });
  }

  next();
}

function validateNote(req, res, next) {
  const { title, subject, content } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be text." });
  }

  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return res.status(400).json({ error: "Subject is required and must be text." });
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "Content is required and must be text." });
  }

  next();
}

function validateTask(req, res, next) {
  const { title, priority } = req.body;
  const allowedPriorities = ["low", "medium", "high"];

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be text." });
  }

  if (!priority || !allowedPriorities.includes(priority.toLowerCase())) {
    return res.status(400).json({ error: "Priority is required and must be low, medium, or high." });
  }

  next();
}

function validateExam(req, res, next) {
  const { subject, date, syllabus } = req.body;

  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return res.status(400).json({ error: "Subject is required and must be text." });
  }

  if (!date || typeof date !== "string" || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: "Date is required and must be a valid date." });
  }

  if (!syllabus || typeof syllabus !== "string" || syllabus.trim() === "") {
    return res.status(400).json({ error: "Syllabus is required and must be text." });
  }

  next();
}

function validatePomodoro(req, res, next) {
  const { task, duration } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ error: "Task is required and must be text." });
  }

  if (duration === undefined || typeof duration !== "number" || duration <= 0) {
    return res.status(400).json({ error: "Duration is required and must be a positive number (in minutes)." });
  }

  next();
}

function validatePlanner(req, res, next) {
  const { day, activity } = req.body;
  const allowedDays = [
    "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday"
  ];

  if (!day || !allowedDays.includes(day.toLowerCase())) {
    return res.status(400).json({ error: "Day is required and must be a valid day of the week." });
  }

  if (!activity || typeof activity !== "string" || activity.trim() === "") {
    return res.status(400).json({ error: "Activity is required and must be text." });
  }

  next();
}

module.exports = {
  validateStudent,
  validateAssignment,
  validateNote,
  validateTask,
  validateExam,
  validatePomodoro,
  validatePlanner
};
