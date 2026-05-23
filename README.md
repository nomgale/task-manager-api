# Task Manager API 🚀

A simple RESTful API built with **Node.js** and **Express.js**, deployed on **AWS EC2**.

## Tech Stack
- Node.js
- Express.js
- AWS EC2 (Ubuntu)
- Git & GitHub

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create a new task |
| PATCH | /tasks/:id | Mark task as completed |
| DELETE | /tasks/:id | Delete a task |

## Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/task-manager-api.git
cd task-manager-api

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# Server runs on http://localhost:3000
```

## Example Requests

### Create a task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn AWS", "description": "Complete EC2 setup"}'
```

### Get all tasks
```bash
curl http://localhost:3000/tasks
```

### Mark as completed
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID
```

### Delete a task
```bash
curl -X DELETE http://localhost:3000/tasks/TASK_ID
```

## Deployment

Deployed on AWS EC2 (Ubuntu Free Tier):
- Configured security groups to allow port 3000
- SSH access via key pair
- Node.js installed on server
- App cloned from GitHub and started with `npm start`
