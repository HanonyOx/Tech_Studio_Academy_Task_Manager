# TaskDuty — Task Manager

TaskDuty is a full-stack task management application built as part of my **Techstudio Academy internship**.

The project was created to put the concepts I learned during the internship into practice, particularly **React, TypeScript, Express.js, MongoDB, Mongoose, REST APIs, Zod validation, and frontend state management**.

TaskDuty allows users to create, view, edit, delete, and filter tasks while keeping the frontend and backend connected through a RESTful API.

---

## 📌 Project Overview

Managing multiple tasks can become difficult when there is no simple way to organize them, track their status, and make changes when necessary.

TaskDuty provides a simple interface for managing tasks.

Each task contains:

* Title
* Description
* Due date
* Category
* Completion status

Users can:

* Create new tasks
* View all tasks
* View a single task
* Edit existing tasks
* Delete tasks
* Filter tasks by category
* Filter tasks by completion status
* Combine category and status filters

The application uses a React frontend and an Express.js backend connected to MongoDB.

---

## 🎓 Internship Context

**Task:** Task Manager
**Program:** Techstudio Academy Internship
**Type:** Full-Stack Web Application

This project was developed as an internship task to demonstrate my understanding of full-stack web development.

The project allowed me to move beyond building static interfaces and understand how a frontend communicates with a backend, how data is stored in a database, how APIs are structured, and how validation is handled before data reaches the database.

---

# 🚀 Features

## 1. Create Tasks

Users can create a new task by providing:

* Task title
* Description
* Due date
* Category

The frontend sends the task information to the Express backend using a `POST` request.

The backend validates the incoming data before creating the task in MongoDB.

---

## 2. View All Tasks

The My Tasks page retrieves tasks from the backend through:

```text
GET /tasks
```

The tasks are then displayed using reusable React components.

Each task card displays:

* Task title
* Description
* Due date
* Category
* Completion status
* Edit button
* Delete button

---

## 3. View a Single Task

The application can retrieve an individual task using its MongoDB ID.

```text
GET /tasks/:id
```

This is mainly used when opening the edit page so that the existing task information can be loaded into the form.

---

## 4. Edit Tasks

Users can edit an existing task.

The task ID is retrieved from the URL using React Router's:

```text
useParams()
```

The existing task is then fetched from the backend and used to populate the form.

After editing, the frontend sends the updated information using:

```text
PUT /tasks/:id
```

---

## 5. Delete Tasks

Users can delete a task from the task list.

Before deleting, the application displays a confirmation modal asking the user to confirm the action.

The backend handles the deletion through:

```text
DELETE /tasks/:id
```

After a successful deletion, the task is also removed from the frontend state so the user immediately sees the updated task list.

---

## 6. Filter Tasks

TaskDuty includes filtering functionality to make it easier to find specific tasks.

### Category Filter

Users can enter a category into the filtering input.

For example:

```text
School
```

The application filters the tasks based on the category.

The category search is case-insensitive, meaning:

```text
School
school
SCHOOL
```

can match the same category.

### Completion Status Filter

Users can also filter tasks by:

* All Status
* Completed
* Pending

The two filters can be used together.

For example:

```text
Category: School
Status: Pending
```

will display only pending tasks belonging to the School category.

---

## 7. Loading State

When tasks are being retrieved from the backend, the application displays a loading spinner.

This prevents the page from appearing empty while the request is still being processed.

---

## 8. Error Handling

The application handles failed API requests.

For example, if the backend is unavailable while the My Tasks page is loading, the application displays an error message instead of silently failing.

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

## Validation

* Zod

## Development Tools

* VS Code
* Git
* GitHub
* npm
* Concurrently

---

# 🏗️ Application Architecture

TaskDuty follows a simple client-server architecture.

```text
                 ┌──────────────────────┐
                 │      React App       │
                 │      Frontend        │
                 │    localhost:5173    │
                 └──────────┬───────────┘
                            │
                            │ HTTP Requests
                            │ REST API
                            ▼
                 ┌──────────────────────┐
                 │    Express Server    │
                 │      Backend         │
                 │    localhost:3000    │
                 └──────────┬───────────┘
                            │
                            │ Mongoose
                            ▼
                 ┌──────────────────────┐
                 │       MongoDB        │
                 │       Database       │
                 └──────────────────────┘
```

The frontend is responsible for:

* User interface
* Forms
* Navigation
* Client-side state
* Filtering
* Sending API requests
* Displaying API responses

The backend is responsible for:

* API endpoints
* Validation
* Database operations
* Error handling
* CRUD operations

MongoDB is responsible for persistent task storage.

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
│   │   ├── models/
│   │   │   └── tasks.ts
│   │   │
│   │   ├── validations/
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

TaskDuty implements the four basic CRUD operations.

| Operation | HTTP Method | Endpoint     | Purpose           |
| --------- | ----------- | ------------ | ----------------- |
| Create    | POST        | `/tasks`     | Create a new task |
| Read      | GET         | `/tasks`     | Get all tasks     |
| Read      | GET         | `/tasks/:id` | Get one task      |
| Update    | PUT         | `/tasks/:id` | Update a task     |
| Delete    | DELETE      | `/tasks/:id` | Delete a task     |

CRUD stands for:

```text
Create
Read
Update
Delete
```

These operations form the foundation of the application's backend functionality.

---

# 🔌 API Endpoints

## Create Task

```http
POST /tasks
```

Example request:

```json
{
  "title": "Complete React Assignment",
  "description": "Finish the React task for the internship",
  "dueDate": "2026-09-30",
  "category": "School"
}
```

---

## Get All Tasks

```http
GET /tasks
```

Example response:

```json
{
  "success": true,
  "tasks": []
}
```

---

## Get One Task

```http
GET /tasks/:id
```

Example:

```text
GET /tasks/68d123456789abcdef123456
```

---

## Update Task

```http
PUT /tasks/:id
```

The updated task information is sent to the backend and validated before the database is changed.

---

## Delete Task

```http
DELETE /tasks/:id
```

The backend first verifies that the task exists before deleting it.

---

# 🛡️ Data Validation

TaskDuty uses **Zod** to validate incoming task data on the backend.

The validation layer checks information such as:

* Title
* Description
* Due date
* Category
* Completion status
* MongoDB task ID

For example, the due date must follow the format:

```text
YYYY-MM-DD
```

An invalid request is rejected before the data is stored in MongoDB.

This provides an additional layer of protection and prevents invalid data from entering the database.

---

# 🗄️ Database

TaskDuty uses **MongoDB** as its database and **Mongoose** as the ODM.

The task model contains:

```text
_id
title
description
dueDate
category
completed
createdAt
updatedAt
```

The `completed` field is a Boolean value and defaults to:

```text
false
```

This means a newly created task starts as pending unless its completion status is changed.

---

# ⚛️ React Concepts Used

The project gave me practical experience with several React concepts.

### `useState`

Used to manage:

* Tasks
* Form values
* Loading state
* Error state
* Filter values
* Delete modal state

### `useEffect`

Used to fetch tasks when the My Tasks page loads.

### Props

The `TaskCard` component receives task information from the parent component.

This makes the component reusable for displaying different tasks.

### React Router

React Router is used for navigation between pages.

Routes include:

```text
/
 /new-task
 /tasks
 /edit-task/:id
```

### `useParams`

Used to retrieve the task ID from:

```text
/edit-task/:id
```

### Controlled Inputs

The task forms use React state to control their input values.

---

# 🎨 UI and UX

The interface was built with **Tailwind CSS**.

The design focuses on:

* Simple navigation
* Clear task cards
* Responsive layouts
* Clear status indicators
* Confirmation before destructive actions
* Loading feedback
* Error feedback
* Filtering functionality

The application also includes responsive layouts for smaller screen sizes.

---

# 🔐 Environment Variables

Sensitive configuration values are stored in an environment file rather than being committed to Git.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

The `.env` file is excluded from Git using `.gitignore`.

The project also ignores dependencies such as:

```text
node_modules/
```

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

Install the root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd web
npm install
```

Return to the root:

```bash
cd ..
```

Install backend dependencies:

```bash
cd api
npm install
```

Return to the root:

```bash
cd ..
```

---

# 🔧 Environment Setup

Inside the `api` folder, create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB connection string.

---

# ▶️ Running the Application

The project is configured to run the frontend and backend together.

From the root directory:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:3000
```

---

# 🧪 Testing the Application

After starting the application:

1. Open the frontend.
2. Navigate to **New Task**.
3. Create a task.
4. Navigate to **My Tasks**.
5. Confirm that the task appears.
6. Open the task's **Edit** option.
7. Modify the task.
8. Save the changes.
9. Return to My Tasks.
10. Test the category filter.
11. Test the completion-status filter.
12. Test the delete functionality.
13. Confirm the delete modal before deleting a task.

---

# 📚 What I Learned

Building TaskDuty helped me understand how the different parts of a full-stack application communicate with each other.

Some of the major concepts I practiced include:

* Building React applications with TypeScript
* Managing React state
* Working with controlled forms
* Using React Router
* Creating reusable components
* Fetching data from APIs
* Building REST APIs with Express
* Implementing CRUD operations
* Connecting Express to MongoDB
* Using Mongoose models
* Validating API data with Zod
* Handling API errors
* Managing loading states
* Filtering data on the frontend
* Working with environment variables
* Structuring a full-stack project
* Using Git and GitHub for version control

One of the most important lessons from the project was understanding that a full-stack application is not just about creating the UI.

The frontend, backend, validation layer, API, and database all have different responsibilities and need to communicate correctly.

---

# 🧠 Key Development Flow

The general flow of creating and managing a task is:

```text
User
 │
 │ fills task form
 ▼
React Frontend
 │
 │ POST /tasks
 ▼
Express API
 │
 │ Zod validation
 ▼
Mongoose
 │
 │ save
 ▼
MongoDB
 │
 │ task created
 ▼
Express API
 │
 │ response
 ▼
React Frontend
 │
 ▼
Task appears in My Tasks
```

For editing:

```text
User
 │
 │ clicks Edit
 ▼
React Router
 │
 │ /edit-task/:id
 ▼
GET /tasks/:id
 │
 ▼
MongoDB
 │
 ▼
Task data returned
 │
 ▼
Edit Form
 │
 │ PUT /tasks/:id
 ▼
Express
 │
 ▼
MongoDB updated
```

---

# 🚧 Future Improvements

Possible improvements for future versions include:

* User authentication
* Individual user task ownership
* Search by task title
* Sorting by due date
* Marking tasks as completed directly from the task card
* Pagination for larger task lists
* Better skeleton loading states
* Toast notifications
* Improved form validation messages
* Task priority levels
* Task deadlines and reminders
* Dashboard with task statistics
* Deployment of the frontend and backend

---

# 👨‍💻 Author

**Anthony Omeh**

Computer Science Student
Full-Stack Developer / Aspiring Software Developer

Built as part of my **Techstudio Academy internship**.

---

# 📄 License

This project was created for educational and internship purposes.

```
```
