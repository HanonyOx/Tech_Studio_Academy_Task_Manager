# TaskDuty — Full-Stack Task Manager

TaskDuty is a full-stack task management application built as part of my **Techstudio Academy Internship**.

The project was created to put the concepts I learned during the internship into practice, particularly **React, TypeScript, Express.js, MongoDB, Mongoose, REST APIs, Zod validation, authentication, authorization, JWT, bcrypt, and user-scoped data**.

TaskDuty allows users to register, log in, and securely manage their own tasks through a RESTful API.

---

## 📌 Project Overview

TaskDuty is a task management application that allows authenticated users to create and manage personal tasks.

Each task contains:

* Title
* Description
* Due date
* Category
* Completion status
* User ownership

Users can:

* Register an account
* Log in
* Create new tasks
* View all of their tasks
* View a single task
* Edit their tasks
* Delete their tasks
* Filter tasks by category
* Filter tasks by completion status

TaskDuty uses a **React + TypeScript frontend** and an **Express + TypeScript backend**, with MongoDB providing persistent data storage.

---

# 🎓 Internship Context

**Task:** Task Manager
**Program:** Techstudio Academy Internship
**Type:** Full-Stack Web Application

The project was developed in stages.

### Stage 1 — CRUD Operations

The first stage focused on building the core task-management system and understanding:

* Create, Read, Update, and Delete operations
* REST APIs
* Express routing
* MongoDB and Mongoose
* Zod validation
* React state management
* Frontend/backend communication

### Stage 2 — Authentication, Authorization & User-Scoped Data

The second stage expanded the backend by introducing:

* User registration
* User login
* Password hashing
* JWT authentication
* Authentication middleware
* Protected routes
* Authorization
* User-scoped tasks
* Backend separation into routes, controllers, middleware, models, and validations

This means tasks no longer exist as globally accessible data. Each task belongs to the user who created it.

---

# 🚀 Features

## 1. User Registration

New users can create an account through:

```http
POST /auth/register
```

The registration process validates the incoming data and securely hashes the user's password before storing it in MongoDB.

---

## 2. User Login

Registered users can log in through:

```http
POST /auth/login
```

After successful authentication, the backend generates a JWT that identifies the authenticated user.

The token can then be sent with protected requests:

```text
Authorization: Bearer <token>
```

---

## 3. Password Security

Passwords are not stored directly in the database.

TaskDuty uses **bcrypt** to hash passwords before they are stored.

This means the database stores a password hash rather than the user's original password.

---

## 4. JWT Authentication

TaskDuty uses **JSON Web Tokens (JWT)** for authentication.

After login:

```text
User logs in
      ↓
Credentials validated
      ↓
JWT generated
      ↓
Token returned
      ↓
Token sent with protected requests
```

The backend verifies this token before allowing access to task endpoints.

---

## 5. Protected Task Routes

All task-management endpoints are protected by authentication middleware.

```text
POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id
```

A valid JWT must be supplied before these routes can be accessed.

---

## 6. Create Tasks

Authenticated users can create tasks using:

```http
POST /tasks
```

Example:

```json
{
  "title": "Complete Backend Assignment",
  "description": "Finish authentication and authorization",
  "dueDate": "2026-10-10",
  "category": "Work",
  "completed": false
}
```

The backend validates the request and automatically attaches the authenticated user's ID to the task.

Conceptually:

```text
Task
├── title
├── description
├── dueDate
├── category
├── completed
└── userId
```

The client does not decide who owns the task. Ownership comes from the authenticated user's JWT.

---

## 7. View All Tasks

Users can retrieve their tasks through:

```http
GET /tasks
```

The backend does not return every task in the database.

Instead, it searches using the authenticated user's ID:

```text
Find tasks where:

userId = currently authenticated user
```

This keeps each user's task collection separate.

---

## 8. View a Single Task

A specific task can be retrieved through:

```http
GET /tasks/:id
```

The backend verifies both:

```text
Task ID matches
AND
Task userId matches authenticated user
```

This prevents one user from retrieving another user's task simply by knowing its MongoDB ID.

---

## 9. Update Tasks

Users can update their own tasks through:

```http
PUT /tasks/:id
```

Before updating, the backend checks:

1. The task ID is valid.
2. The request body is valid.
3. The user is authenticated.
4. The task belongs to the authenticated user.
5. The supplied due date is valid.

Only after these checks is the task updated.

---

## 10. Delete Tasks

Users can delete their own tasks through:

```http
DELETE /tasks/:id
```

The backend searches for the task using both the task ID and authenticated user's ID.

If the task does not belong to that user, it is not returned and therefore cannot be deleted.

---

## 11. User-Scoped Data

One of the major improvements introduced in Stage 2 is **user-scoped data**.

Instead of:

```text
User A ──┐
User B ──┼──→ All Tasks
User C ──┘
```

TaskDuty now follows:

```text
User A
├── Task 1
└── Task 2

User B
├── Task 3
└── Task 4
```

User A cannot read, update, or delete User B's tasks.

This is enforced on the backend rather than relying on the frontend.

---

## 12. Filtering

TaskDuty supports frontend filtering based on:

* Category
* Completion status

Users can view:

* All tasks
* Completed tasks
* Pending tasks

Category and status filtering can also be combined.

---

## 13. Loading & Error States

The frontend includes loading states while communicating with the backend.

API failures are also handled so the user receives feedback when something goes wrong.

---

# 🔐 Authentication vs Authorization

One of the important concepts explored while building TaskDuty was understanding the difference between authentication and authorization.

### Authentication

Authentication answers:

> Who are you?

TaskDuty handles this using:

```text
Email + Password
       ↓
Login
       ↓
JWT
       ↓
authMiddleware
       ↓
req.userId
```

### Authorization

Authorization answers:

> Are you allowed to perform this action on this resource?

For example, being logged in does not automatically mean a user should be allowed to update every task.

TaskDuty verifies task ownership using both:

```text
Task ID
+
Authenticated User ID
```

before returning, updating, or deleting a task.

---

# 🛡️ Authentication Middleware

Protected routes pass through `authMiddleware`.

The middleware:

1. Reads the Authorization header.
2. Extracts the Bearer token.
3. Verifies the JWT.
4. Retrieves the authenticated user's ID.
5. Attaches the ID to the Express request.
6. Allows the request to continue.

The flow is:

```text
Request
   ↓
Authorization: Bearer <token>
   ↓
authMiddleware
   ↓
Verify JWT
   ↓
req.userId
   ↓
Controller
```

Without a valid token, the protected operation is rejected.

---

# 🛠️ Technologies Used

## Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS
* Lucide React

## Backend

* Node.js
* Express.js
* TypeScript
* Mongoose

## Database

* MongoDB

## Authentication & Security

* JSON Web Token (JWT)
* bcrypt
* Authentication middleware
* User-scoped authorization

## Validation

* Zod

## Development & Testing Tools

* VS Code
* Git
* GitHub
* npm
* Concurrently
* Postman

---

# 🏗️ Backend Architecture

The backend is separated into different responsibilities instead of keeping the entire application inside `server.ts`.

```text
HTTP Request
      ↓
server.ts
      ↓
Routes
      ↓
Middleware
      ↓
Controllers
      ↓
Models
      ↓
MongoDB
```

### Server

`server.ts` is responsible for:

* Creating the Express application
* Connecting to MongoDB
* Registering global middleware
* Registering route groups
* Starting the server

### Routes

Routes determine which controller handles a request.

Examples:

```text
POST /auth/login → login controller
GET /tasks       → getTasks controller
DELETE /tasks/:id → deleteTask controller
```

### Middleware

Middleware runs between the request and controller.

`authMiddleware` verifies authentication before protected task controllers execute.

### Controllers

Controllers contain the main request-handling logic.

Examples:

* `register`
* `login`
* `createTask`
* `getTasks`
* `getTask`
* `updateTask`
* `deleteTask`

### Models

Mongoose models define how user and task documents are stored in MongoDB.

### Validations

Zod schemas validate incoming data before controllers perform database operations.

---

# 📁 Project Structure

```text
Task-manager/
│
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── tasksController.ts
│   │   │
│   │   ├── middlewares/
│   │   │   └── authMiddleware.ts
│   │   │
│   │   ├── models/
│   │   │   ├── user.ts
│   │   │   └── tasks.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── tasksRoutes.ts
│   │   │
│   │   ├── validations/
│   │   │   ├── authValidation.ts
│   │   │   └── taskValidation.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── TaskCard.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── MyTasks.tsx
│   │   │   ├── NewTask.tsx
│   │   │   └── EditTask.tsx
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

# 🔄 CRUD Operations

| Operation | HTTP Method | Endpoint     | Authentication | Purpose              |
| --------- | ----------- | ------------ | -------------- | -------------------- |
| Create    | POST        | `/tasks`     | Required       | Create a task        |
| Read      | GET         | `/tasks`     | Required       | Get user's tasks     |
| Read      | GET         | `/tasks/:id` | Required       | Get one owned task   |
| Update    | PUT         | `/tasks/:id` | Required       | Update an owned task |
| Delete    | DELETE      | `/tasks/:id` | Required       | Delete an owned task |

CRUD stands for:

```text
Create
Read
Update
Delete
```

All TaskDuty CRUD operations are now scoped to the authenticated user.

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /auth/register
```

Creates a new user account.

### Login

```http
POST /auth/login
```

Authenticates a user and returns a JWT.

---

## Tasks

All task routes require:

```http
Authorization: Bearer <token>
```

### Create Task

```http
POST /tasks
```

### Get User's Tasks

```http
GET /tasks
```

### Get One Task

```http
GET /tasks/:id
```

### Update Task

```http
PUT /tasks/:id
```

### Delete Task

```http
DELETE /tasks/:id
```

---

# 🛡️ Data Validation

TaskDuty uses **Zod** to validate incoming data.

Validation is used for:

* Registration data
* Login data
* Task creation
* Task updates
* MongoDB task IDs
* Due dates
* Categories
* Completion status

Invalid requests are rejected before database operations are performed.

---

# 🗄️ Database

TaskDuty uses **MongoDB** as its database and **Mongoose** as its ODM.

## User

A user contains account information required for authentication.

Conceptually:

```text
User
├── _id
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

Passwords are stored as hashes rather than plain-text passwords.

## Task

A task contains:

```text
Task
├── _id
├── title
├── description
├── dueDate
├── category
├── completed
├── userId
├── createdAt
└── updatedAt
```

`userId` connects each task to its owner.

---

# 🔗 User and Task Relationship

The relationship between users and tasks can be represented as:

```text
User
 │
 │ _id
 │
 └─────────────┐
               │
               ▼
             Task
             userId
```

When a user creates a task:

```text
Authenticated user
      ↓
req.userId
      ↓
Task.create({
   ...
   userId: req.userId
})
```

This creates ownership between the user and the task.

---

# ⚛️ React Concepts Used

The frontend provides practical experience with:

### `useState`

Used for:

* Tasks
* Form values
* Loading states
* Error states
* Filter values
* Delete modal state

### `useEffect`

Used for fetching task information from the backend.

### Props

Reusable components such as `TaskCard` receive information through props.

### React Router

Used for navigation between pages.

Routes include:

```text
/
/new-task
/tasks
/edit-task/:id
```

### `useParams`

Used to retrieve task IDs from dynamic URLs.

### Controlled Inputs

Forms use React state to control input values.

---

# 🎨 UI and UX

TaskDuty uses **Tailwind CSS** for styling.

The interface focuses on:

* Simple navigation
* Clear task cards
* Responsive layouts
* Status indicators
* Confirmation before destructive actions
* Loading feedback
* Error feedback
* Filtering

---

# 🔐 Environment Variables

Sensitive configuration values are stored in `.env`.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The `.env` file should never be committed to Git.

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd Task-manager
```

Install root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd web
npm install
```

Install backend dependencies:

```bash
cd ../api
npm install
```

Return to the root:

```bash
cd ..
```

---

# 🔧 Environment Setup

Inside `api`, create a `.env` file.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the example values with your own configuration.

---

# ▶️ Running the Application

From the root directory:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

# 🧪 Backend Testing With Postman/ThunderClient

Stage 2 can be tested through Postman.

Recommended flow:

```text
1. Register User A
        ↓
2. Login User A
        ↓
3. Copy User A's JWT
        ↓
4. Create tasks as User A
        ↓
5. Get User A's tasks
        ↓
6. Get one task
        ↓
7. Update the task
        ↓
8. Delete the task
```

Authorization header:

```text
Authorization: Bearer <JWT>
```

---

# 🧪 Testing User-Scoped Authorization

A second user can be created to verify that authorization is working.

```text
User A creates Task A
User B creates Task B
```

Then test:

```text
User A token + Task A → Allowed ✅
User B token + Task B → Allowed ✅

User A token + Task B → Not returned ❌
User B token + Task A → Not returned ❌
```

This proves that authentication alone is not being relied upon and that task ownership is enforced.

---

# 🧠 Request Flow

A protected request now follows:

```text
Client
  │
  │ Authorization: Bearer JWT
  ▼
Express Server
  │
  ▼
Task Route
  │
  ▼
authMiddleware
  │
  │ Verify JWT
  │ Set req.userId
  ▼
Task Controller
  │
  │ Validate request
  │ Check task ownership
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
Response
```

---

# 🧠 Example: Creating a Task

```text
Authenticated User
      │
      │ POST /tasks
      ▼
tasksRoutes
      │
      ▼
authMiddleware
      │
      │ verify JWT
      │ req.userId
      ▼
createTask Controller
      │
      │ Zod validation
      ▼
Task.create()
      │
      │ userId: req.userId
      ▼
MongoDB
      │
      ▼
Task created for that user
```

---

# 🧠 Example: Updating a Task

```text
User
 │
 │ PUT /tasks/:id
 ▼
authMiddleware
 │
 │ req.userId
 ▼
updateTask
 │
 ├── Validate task ID
 ├── Validate request body
 │
 ▼
Task.findOne({
   _id: requestedTaskId,
   userId: req.userId
})
 │
 ▼
Ownership confirmed
 │
 ▼
Update + save
```

This prevents one authenticated user from modifying another user's task.

---

# 📚 What I Learned

Building TaskDuty helped me understand how different parts of a full-stack application work together.

Some of the major concepts I practiced include:

* Building React applications with TypeScript
* Managing React state
* Working with controlled forms
* React Router
* Reusable React components
* Fetching data from APIs
* Building REST APIs with Express
* CRUD operations
* Connecting Express to MongoDB
* Working with Mongoose
* Zod validation
* User registration and login
* Password hashing with bcrypt
* JWT authentication
* Authentication middleware
* Authorization
* Protected API routes
* User-scoped data
* Resource ownership
* Express routers
* Controllers
* Separating backend responsibilities
* Postman API testing
* Environment variables
* Git and GitHub

One of the biggest lessons from Stage 2 was understanding that:

> **Authentication and authorization are not the same thing.**

Authentication tells the backend **who the user is**.

Authorization determines **what that user is allowed to access or modify**.

Another major lesson was understanding why backend structure matters.

Instead of putting every endpoint and database operation inside `server.ts`, the backend now separates responsibilities between:

```text
Routes
Middleware
Controllers
Models
Validations
```

This makes the application easier to understand, maintain, debug, and extend.

---

# 🚧 Future Improvements

Possible improvements include:

* Connect the authenticated backend flow fully to the frontend
* Add frontend login and registration pages
* Store and manage authentication state on the client
* Search tasks by title
* Sort tasks by due date
* Mark tasks completed directly from task cards
* Pagination
* Toast notifications
* Improved validation feedback
* Task priorities
* Deadlines and reminders
* Dashboard statistics
* Password reset
* Email verification
* Deployment of the frontend and backend

---

# 👨‍💻 Author

**Anthony Omeh**

Computer Science Student
Full-Stack Developer / Aspiring Software Developer

Built as part of my **Techstudio Academy Internship**.

---

# 📄 License

This project was created for educational and internship purposes.
