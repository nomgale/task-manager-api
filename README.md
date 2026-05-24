## **#Task Manager API 🚀**



A RESTful CRUD API built with Node.js and Express.js, deployed live on Railway.



🔗 \*\*Live API:\*\* https://task-manager-api-production-34a8.up.railway.app/tasks

💻 \*\*GitHub:\*\* https://github.com/nomgale/task-manager-api



\## Tech Stack

\- Node.js

\- Express.js

\- Railway (Deployment)

\- Git \& GitHub



###### **## API Endpoints**



| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | /tasks | Get all tasks |

| POST | /tasks | Create a new task |

| PATCH | /tasks/:id | Mark task as completed |

| DELETE | /tasks/:id | Delete a task |



##### **## Run Locally**



```bash

git clone https://github.com/nomgale/task-manager-api.git

cd task-manager-api

npm install

npm start

```



Server runs on http://localhost:3000



###### **## Example Requests**



```bash

###### **# Create a task**

curl -X POST https://task-manager-api-production-34a8.up.railway.app/tasks \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{"title": "Learn AWS"}'



###### **# Get all tasks**

curl https://task-manager-api-production-34a8.up.railway.app/tasks

```



###### **## Author**

\*\*Om Singh Chauhan\*\* — BTech CSE, Noida International University

