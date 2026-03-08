**MERN-Task-Management-System**
# MERN Project & Task Management System

A complete MERN stack application for managing projects and tasks using a scalable architecture.

> **Important:** MongoDB can run in Docker externally, but this app itself contains no Docker configuration.

## Folder Structure

```text
MERN-Task-Management-System/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── validateObjectId.js
│   ├── .env.example
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── hooks/
│   │   └── useProjects.js
│   ├── pages/
│   │   ├── CreateProject.jsx
│   │   ├── CreateTask.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditTask.jsx
│   │   ├── ProjectDetails.jsx
│   │   └── ProjectsList.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── projectService.js
│   │   └── taskService.js
│   ├── .env.example
│   ├── App.jsx
│   ├── index.html
│   ├── main.jsx
│   ├── package.json
│   ├── styles.css
│   └── vite.config.js
└── README.md
```

## Backend Implementation (Node.js + Express + Mongoose)

- MVC architecture with separated models, controllers, routes, middleware, and config.
- MongoDB integration via Mongoose (`MONGO_URI` from `.env`).
- Project and Task schemas with validation and timestamps.
- Full CRUD API for projects and tasks.
- Tasks linked to projects through ObjectId reference.
- Input validation middleware and centralized error handling.

### Backend Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/management_app
```

## Frontend Implementation (React + Vite)

- React with React Router for page-based navigation.
- Axios-based API service layer.
- Reusable components (`TaskForm`, `ProjectForm`, `TaskList`, `Navbar`).
- Pages include:
  - Dashboard
  - Projects List
  - Project Details (tasks shown by project)
  - Create Project
  - Create Task
  - Edit Task
- Supports creating projects/tasks, updating task status, deleting tasks, and grouped dashboard task visibility.

### Frontend Environment Variables

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Usage Examples

### Projects

#### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Revamp",
    "description": "Refresh landing page and dashboard UX"
  }'
```

#### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

#### Get Project By ID
```bash
curl http://localhost:5000/api/projects/<projectId>
```

#### Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/<projectId> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Revamp - Phase 2",
    "description": "Add analytics and optimize performance"
  }'
```

#### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/<projectId>
```

### Tasks

#### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build project dashboard",
    "description": "Create cards and stats widgets",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-12-31",
    "project": "<projectId>"
  }'
```

#### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

#### Get Tasks By Project
```bash
curl http://localhost:5000/api/tasks/project/<projectId>
```

#### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/<taskId> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build project dashboard",
    "description": "Create cards, charts, and stats widgets",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-12-31",
    "project": "<projectId>"
  }'
```

#### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/<taskId>
```


## CI / PR Reliability Notes

To reduce PR failures in monorepo-style checks:

- A root `package.json` is included so CI commands run from repository root do not fail.
- A root `npm run check` command validates backend JavaScript syntax without requiring dependency installation.
- A GitHub Actions workflow (`.github/workflows/pr-checks.yml`) runs these root checks on pull requests.

You can run this locally:

```bash
npm run check
```

## Run Instructions

### 1) Start MongoDB (externally)
Make sure MongoDB is reachable via:

```text
mongodb://localhost:27017/management_app
```

### 2) Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3) Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at the Vite URL (typically `http://localhost:5173`).

## Notes

- No Dockerfile, docker-compose, or Kubernetes manifests are included.
- This setup is intentionally local-run first to support later containerization practice.


## Direct Main Branch Commit Flow

If you want changes to appear on GitHub `main` immediately (without opening a PR), run:

```bash
git checkout main
git pull origin main
git merge work
git push origin main
```

If your local repository has no remote configured, add it first:

```bash
git remote add origin https://github.com/<your-username>/MERN-Task-Management-System.git
```
