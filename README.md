# Student Survival Hub - Backend API

Backend REST API for the Student Survival Hub project (DecodeLabs Project 2).
Built with Node.js and Express, using JSON files as simple file-based storage.

## Setup

```
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`.

## Running with the frontend

The `frontend/` folder (a sibling of this `backend/` folder) is a plain
HTML/CSS/JS UI that talks to this API. With the backend running:

```
cd frontend
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser. The backend has CORS
enabled, so the frontend (a different origin/port) is allowed to call it.
The page shows a connection stamp (CONNECTED / OFFLINE) so you can tell
at a glance whether the backend is reachable.

## Project Structure

```
backend/
  server.js
  package.json
  routes/         -> defines the URL paths for each resource
  controllers/     -> handles the logic for each request
  middleware/       -> input validation before controllers run
  data/              -> JSON files acting as the database
```

## API Endpoints

Every resource below supports the same two actions:

| Method | Endpoint        | Description                     |
|--------|-----------------|----------------------------------|
| GET    | /students        | Get all students                |
| POST   | /students        | Add a new student                |
| GET    | /assignments     | Get all assignments               |
| POST   | /assignments     | Add a new assignment              |
| GET    | /notes           | Get all notes                     |
| POST   | /notes           | Add a new note                     |
| GET    | /tasks           | Get all tasks                      |
| POST   | /tasks           | Add a new task                      |
| GET    | /exams           | Get all exams                        |
| POST   | /exams           | Add a new exam                        |
| GET    | /pomodoro        | Get all pomodoro sessions              |
| POST   | /pomodoro        | Log a new pomodoro session               |
| GET    | /planner         | Get all planner entries                   |
| POST   | /planner         | Add a new planner entry                    |

## Request Body Examples (for POST)

**POST /students**
```json
{ "name": "Ifra", "semester": 6, "cgpa": 3.7 }
```

**POST /assignments**
```json
{ "title": "OS Assignment 2", "subject": "Operating Systems", "dueDate": "2026-07-20" }
```

**POST /notes**
```json
{ "title": "Induction Proofs", "subject": "Discrete Math", "content": "Base case + inductive step..." }
```

**POST /tasks**
```json
{ "title": "Revise K-Maps", "priority": "high" }
```

**POST /exams**
```json
{ "subject": "Digital Logic", "date": "2026-07-25", "syllabus": "Chapters 1-5" }
```

**POST /pomodoro**
```json
{ "task": "Study for Digital Logic exam", "duration": 25 }
```

**POST /planner**
```json
{ "day": "Monday", "activity": "Finish Project 2 backend" }
```

## Validation

Each POST route runs through a validation middleware before reaching the
controller. If a required field is missing or the wrong type, the API
returns a `400` status with a message describing what went wrong.

## HTTP Status Codes Used

- `200` - successful GET request
- `201` - resource created successfully (POST)
- `400` - invalid or missing input
- `404` - route does not exist
- `500` - unexpected server error

## Testing

Import `Student-Survival-Hub.postman_collection.json` into Postman to test
all endpoints quickly, or use curl, e.g.:

```
curl http://localhost:5000/students
curl -X POST http://localhost:5000/students -H "Content-Type: application/json" -d "{\"name\":\"Ifra\",\"semester\":6,\"cgpa\":3.7}"
```
