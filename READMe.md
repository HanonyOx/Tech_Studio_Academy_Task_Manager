# TaskDuty — Full-Stack Task Manager

TaskDuty is a full-stack task management application built as part of my **Techstudio Academy Internship**.

The project applies concepts learned throughout the internship, including React, TypeScript, Express.js, MongoDB, Mongoose, REST APIs, Zod validation, JWT authentication, bcrypt, authorization, and user-scoped data.

TaskDuty allows users to create and manage tasks through a React frontend backed by an Express REST API.

The project has progressed through three stages:

* **Stage 1:** Core task management and CRUD operations.
* **Stage 2:** Authentication, authorization, and user-scoped task management.
* **Stage 3:** Task search functionality using the task title and description.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Internship Progress](#internship-progress)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Architecture](#architecture)
* [Project Structure](#project-structure)
* [Task Data Model](#task-data-model)
* [API Documentation](#api-documentation)
* [Task Search Functionality](#task-search-functionality)
* [Authentication and Authorization](#authentication-and-authorization)
* [Validation and Error Handling](#validation-and-error-handling)
* [Environment Variables](#environment-variables)
* [Installation](#installation)
* [Running the Application](#running-the-application)
* [Testing](#testing)
* [Git Workflow](#git-workflow)
* [What I Learned](#what-i-learned)
* [Future Improvements](#future-improvements)
* [Author](#author)

---

## Project Overview

TaskDuty is a task management application that supports creating, retrieving, updating, deleting, filtering, and searching tasks.

Each task contains:

* Title
* Description
* Due date
* Category
* Completion status
* User ownership

The backend exposes RESTful API endpoints, while the frontend provides a responsive interface for interacting with task data.

MongoDB stores application data, and Mongoose provides the object data modelling layer.

The project is designed to demonstrate how frontend and backend technologies work together in a full-stack application.

---

## Internship Progress

TaskDuty was developed incrementally as part of the Techstudio Academy Internship.

### Stage 1 — CRUD Operations

The first stage focused on building the foundation of the application.

Key concepts included:

* Create, Read, Update, and Delete operations.
* REST API design.
* Express routing.
* MongoDB and Mongoose.
* Zod validation.
* React state management.
* Controlled form inputs.
* Frontend and backend communication.
* Task categories, due dates, and completion status.

### Stage 2 — Authentication, Authorization, and User-Scoped Data

The second stage introduced authentication and resource ownership.

Key features included:

* User registration and login.
* Password hashing with bcrypt.
* JWT generation and verification.
* Authentication middleware.
* Protected task endpoints.
* User-specific task ownership.
* Resource-level authorization.
* Separation of routes, controllers, middleware, models, and validation schemas.

The main objective was to ensure that authenticated users could access and modify only the tasks they owned.

### Stage 3 — Task Search Functionality

The third stage introduced search functionality.

The implementation adds a search input to the task page and connects it to the backend through a query parameter.

The search functionality supports:

* Searching task titles.
* Searching task descriptions.
* Case-insensitive matching.
* Updating results when the search term changes.
* Combining search results with existing category and completion-status filters.

The backend uses MongoDB query conditions to identify matching tasks.

The search endpoint is currently configured for public access and searches across the task collection. This differs from the user-scoped listing introduced in Stage 2 and is documented below.

---

## Features

### 1. Task Creation

Users can create tasks containing a title, description, due date, category, and completion status.

The backend validates incoming data before saving tasks to MongoDB.

### 2. Task Retrieval

The application retrieves task records through its REST API.

The task-list endpoint supports retrieving tasks and optionally filtering the results by a search term.

Individual task retrieval remains a separate operation.

### 3. Task Updating

Tasks can be updated through the task-specific endpoint.

The backend validates the request and checks resource ownership where authentication is required.

### 4. Task Deletion

Tasks can be deleted through the task-specific endpoint.

The frontend also updates its displayed task list after a successful deletion.

### 5. Category Filtering

Users can filter tasks according to their assigned category.

### 6. Completion-Status Filtering

Users can filter tasks to display all, completed, or pending tasks.

### 7. Task Search

Users can search for tasks using words or phrases in their titles and descriptions.

For example, searching for `assignment` can match:

* A task titled `Complete Assignment`.
* A task whose description contains `Submit the assignment before Friday`.

Search matching is case-insensitive.

### 8. Loading and Error States

The frontend manages loading and error states when communicating with the API.

This helps communicate the application's current state and report request failures.

### 9. Responsive User Interface

The frontend uses Tailwind CSS to provide a clean interface that adapts to different screen sizes.

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB
* Mongoose

### Authentication and Security

* JSON Web Tokens (JWT)
* bcrypt
* Authentication middleware
* Resource ownership checks

### Validation

* Zod

### Development and Testing Tools

* Visual Studio Code
* Git
* GitHub
* npm
* Concurrently
* Postman

---

## Architecture

TaskDuty separates frontend responsibilities from backend processing and database operations.

### Backend Request Flow

```text
HTTP Request
     |
     v
Express Server
     |
     v
Route
     |
     v
Authentication Middleware
(if required by the route)
     |
     v
Controller
     |
     v
Mongoose Model
     |
     v
MongoDB
     |
     v
HTTP Response
```

Not every route passes through authentication middleware. The task-list endpoint currently supports public access, while task creation and individual-task operations remain protected.

### Backend Responsibilities

**Server**

The server initializes the Express application, connects to MongoDB, registers middleware, configures routes, and starts the API.

**Routes**

Routes map HTTP requests to their corresponding controllers and determine which middleware runs before the controller.

**Middleware**

Authentication middleware verifies JWTs, identifies the authenticated user, and makes the user's ID available to protected controllers.

**Controllers**

Controllers process incoming requests, interact with the database, and return appropriate HTTP responses.

**Models**

Mongoose models define the structure and behaviour of user and task documents.

**Validations**

Zod schemas validate incoming data before relevant database operations are performed.

---

## Project Structure

The principal project files are organised as follows:

```text
Task-manager/
|
├── api/
|   ├── src/
|   |   ├── config/
|   |   |   └── db.ts
|   |   |
|   |   ├── controllers/
|   |   |   ├── authController.ts
|   |   |   └── tasksController.ts
|   |   |
|   |   ├── middlewares/
|   |   |   └── authMiddleware.ts
|   |   |
|   |   ├── models/
|   |   |   ├── user.ts
|   |   |   └── tasks.ts
|   |   |
|   |   ├── routes/
|   |   |   ├── authRoutes.ts
|   |   |   └── tasksRoutes.ts
|   |   |
|   |   ├── validations/
|   |   |   ├── authValidation.ts
|   |   |   └── taskValidation.ts
|   |   |
|   |   └── server.ts
|   |
|   ├── package.json
|   └── tsconfig.json
|
├── web/
|   ├── src/
|   |   ├── components/
|   |   |   ├── Navbar.tsx
|   |   |   └── TaskCard.tsx
|   |   |
|   |   ├── pages/
|   |   |   ├── Home.tsx
|   |   |   ├── MyTask.tsx
|   |   |   ├── NewTask.tsx
|   |   |   └── EditTask.tsx
|   |   |
|   |   ├── App.tsx
|   |   └── main.tsx
|   |
|   ├── package.json
|   └── tsconfig.json
|
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

*Note: This structure reflects the intended organisation of the project. Verify filenames against the actual repository if your local files differ.*

---

## Task Data Model

### User Model

A user record contains the information required for authentication and account management.

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

Passwords should be stored as bcrypt hashes rather than plaintext values.

### Task Model

A task contains the information required for task management.

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

The `userId` field associates a task with its owner.

When an authenticated user creates a task, the backend derives ownership from the authenticated request rather than trusting a user ID supplied by the client.

---

## API Documentation

The API runs locally on port `3000` by default.

The following endpoints describe the current route configuration.

### Authentication Endpoints

| Method | Endpoint         | Purpose                              |
| ------ | ---------------- | ------------------------------------ |
| POST   | `/auth/register` | Register a user                      |
| POST   | `/auth/login`    | Authenticate a user and obtain a JWT |

### Task Endpoints

| Method | Endpoint     | Authentication | Purpose                   |
| ------ | ------------ | -------------- | ------------------------- |
| POST   | `/tasks`     | Required       | Create a task             |
| GET    | `/tasks`     | Not required   | Retrieve and search tasks |
| GET    | `/tasks/:id` | Required       | Retrieve a specific task  |
| PUT    | `/tasks/:id` | Required       | Update a specific task    |
| DELETE | `/tasks/:id` | Required       | Delete a specific task    |

Authentication requirements reflect the current route configuration. They should be updated if the route protection changes.

### Creating a Task

```http
POST /tasks
Content-Type: application/json
Authorization: Bearer <token>
```

Example request body:

```json
{
  "title": "Complete Backend Assignment",
  "description": "Finish the task management assignment",
  "dueDate": "2026-10-20",
  "category": "Work",
  "completed": false
}
```

The example assumes the supplied date satisfies the application's validation rules.

### Retrieving Tasks

```http
GET /tasks
```

The task-list endpoint returns the task records matched by its current database query.

### Searching Tasks

```http
GET /tasks?search=assignment
```

The `search` query parameter is optional.

When supplied, it filters the task collection by matching the title or description.

### Retrieving One Task

```http
GET /tasks/:id
Authorization: Bearer <token>
```

The backend verifies the requested task and its ownership according to the current controller implementation.

### Updating a Task

```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json
```

The backend validates the supplied data and checks the applicable ownership rules.

### Deleting a Task

```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

The backend checks the applicable ownership rules before deleting a task.

---

## Task Search Functionality

Task search is implemented across the frontend and backend.

### Frontend

The frontend maintains the current search term in React state.

When the user enters or changes a search term, the application sends a request to the task-list endpoint.

The search term is URL-encoded before being included in the request.

Example:

```text
User enters a search term
          |
          v
React updates search state
          |
          v
Frontend sends GET /tasks?search=...
          |
          v
Backend returns matching tasks
          |
          v
Frontend displays the results
```

### Backend

The backend reads the search term from the request query parameters.

MongoDB performs case-insensitive matching against the task title and description.

Conceptually, the query applies the following condition:

```text
Match a task if:

title contains the search term

OR

description contains the search term
```

When no search term is provided, the query does not apply the title-or-description search condition.

### Combining Search and Filters

The frontend also supports category and completion-status filtering.

The search request determines which tasks are returned by the backend. The frontend then applies its existing filters to those returned tasks.

Consequently, a task must satisfy the search condition and the selected frontend filters to appear in the displayed results.

### Search Implementation Considerations

The current implementation sends a request whenever the search state changes.

For a small internship assignment, this provides straightforward interactive searching.

Potential future improvements include:

* Debouncing input to reduce unnecessary API requests.
* Pagination for larger task collections.
* Search-result counts.
* More explicit handling of empty search results.
* Additional safeguards for user-controlled search patterns.

---

## Authentication and Authorization

Authentication and authorization are separate concepts.

### Authentication

Authentication determines who is making a request.

TaskDuty uses email/password login and JWTs for this purpose.

The authentication flow is:

```text
User submits credentials
          |
          v
Backend validates credentials
          |
          v
JWT is generated
          |
          v
Client receives token
          |
          v
Token is supplied to protected endpoints
          |
          v
Authentication middleware verifies token
```

Protected requests use the following header:

```http
Authorization: Bearer <token>
```

### Authorization

Authorization determines whether a user is allowed to access or modify a resource.

For user-owned task operations, the backend checks the task ID together with the authenticated user's ID.

This prevents an authenticated user from accessing or modifying another user's task through the protected individual-task endpoints, provided the ownership checks are correctly enforced in the controllers.

### Current Task-List Access

The current Task 3 implementation deliberately allows unauthenticated access to `GET /tasks` and removes the user-ID restriction from its list query.

As a result, this endpoint can return tasks belonging to multiple users.

**Important security consideration:** Publicly returning personal task data is not appropriate for a production task manager. If the application is intended to preserve private task ownership, the task-list route and query should instead enforce authentication and filter results by the authenticated user's ID.

The public search configuration is documented here to describe the current implementation accurately, not as a recommendation for production security.

---

## Validation and Error Handling

TaskDuty uses Zod to validate incoming data in relevant authentication and task operations.

Depending on the endpoint and its validation schema, checks may cover:

* Required fields.
* Email format.
* Password requirements.
* Task title and description.
* Due-date format and rules.
* Category values.
* Completion status.
* MongoDB task IDs.
* Request-body structure.

Invalid requests should be rejected before the corresponding database operation is performed.

The frontend also manages loading and error states when API requests fail.

---

## Environment Variables

The backend requires environment variables for its configuration.

Create an `.env` file inside the `api` directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your actual development configuration.

**Never commit your real `.env` file, database credentials, or JWT secret to GitHub.**

Ensure that `.env` is included in `.gitignore`.

---

## Installation

### Prerequisites

Install the following tools:

* Node.js.
* npm.
* Git.
* MongoDB access, such as a configured MongoDB Atlas cluster.
* A code editor such as Visual Studio Code.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Task-manager
```

Replace `<your-repository-url>` with the actual GitHub repository URL.

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd api
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../web
npm install
```

### 5. Configure Environment Variables

Create the `api/.env` file and configure the database connection and JWT secret.

Return to the project root after configuration:

```bash
cd ..
```

---

## Running the Application

From the project root, run:

```bash
npm run dev
```

This assumes the root `package.json` defines a development script that starts the frontend and backend.

If the root script is unavailable, start each application separately using its own development script.

### Frontend

The Vite development server commonly runs at:

```text
http://localhost:5173
```

### Backend

The Express API commonly runs at:

```text
http://localhost:3000
```

The actual ports depend on the application configuration.

---

## Testing

### Task Search Tests

The following scenarios can be used to verify the search implementation.

| Test                               | Expected behaviour                                 |
| ---------------------------------- | -------------------------------------------------- |
| Load `/tasks`                      | Tasks are returned                                 |
| Search by title                    | Matching titles are returned                       |
| Search by description              | Matching descriptions are returned                 |
| Search with different letter cases | Matching remains case-insensitive                  |
| Search for nonexistent text        | No matching tasks are returned                     |
| Clear the search input             | The unfiltered task list is requested              |
| Apply a category filter            | Only tasks in that category remain visible         |
| Apply a status filter              | Only tasks with the selected status remain visible |
| Combine search and filters         | Results satisfy the search and selected filters    |

These are recommended verification scenarios; they should be marked as passed only after being tested.

### Authentication Tests

Protected task endpoints can be tested with Postman or another API client.

A recommended test sequence is:

1. Register User A.
2. Log in as User A.
3. Save the returned JWT.
4. Create a task as User A.
5. Retrieve that task.
6. Update the task.
7. Delete the task.
8. Repeat with User B.
9. Attempt to access User A's task using User B's token.

Expected results depend on the endpoint's current authentication and ownership rules.

### TypeScript and Production Build Checks

From the backend directory:

```bash
npx tsc --noEmit
```

From the frontend directory:

```bash
npm run build
```

These commands help identify TypeScript errors and frontend production-build failures.

---

## Git Workflow

TaskDuty uses Git for version control.

The Task 3 search functionality was developed on a separate feature branch:

```text
main
  |
  └── task-search
```

The intended workflow is:

1. Create or switch to the `task-search` branch.
2. Implement the backend and frontend search changes.
3. Test the functionality.
4. Commit the changes.
5. Push the feature branch to GitHub.
6. Merge the feature branch into `main`.
7. Push the updated `main` branch.

Example commands:

```bash
git switch task-search
git status
git add api/src/controllers/tasksController.ts api/src/routes/tasksRoutes.ts web/src/pages/MyTask.tsx
git commit -m "Implement task search functionality"
git push -u origin task-search
```

After verifying the feature branch has been pushed and the changes are ready to integrate:

```bash
git switch main
git pull origin main
git merge task-search
git push origin main
```

Resolve any merge conflicts before pushing.

---

## What I Learned

Building TaskDuty has helped me practise the concepts involved in developing a full-stack web application.

Key learning areas include:

* React components and state management.
* Controlled form inputs.
* React Router.
* TypeScript in frontend and backend applications.
* REST API design.
* Express routing and middleware.
* CRUD operations.
* MongoDB and Mongoose.
* Zod validation.
* Password hashing with bcrypt.
* JWT authentication.
* Authorization and resource ownership.
* User-scoped data.
* Search queries and URL query parameters.
* Frontend/backend integration.
* Loading and error states.
* API testing.
* Environment configuration.
* Git branching, commits, and merging.

One of the most important concepts I explored was the difference between authentication and authorization.

**Authentication identifies a user. Authorization determines what that user is allowed to do.**

I also learned how backend responsibilities can be separated into routes, middleware, controllers, models, and validation schemas to make an application easier to understand and maintain.

The search implementation provided additional practical experience connecting React state to API query parameters and translating user input into database queries.

---

## Future Improvements

Possible improvements include:

* Integrating frontend login and registration with the authenticated backend.
* Implementing a secure client-side authentication flow.
* Restoring user-scoped access to the task-list endpoint if tasks must remain private.
* Adding debounced search.
* Adding pagination.
* Sorting tasks by due date.
* Adding task priorities.
* Improving validation feedback.
* Adding toast notifications.
* Adding dashboard statistics.
* Implementing reminders.
* Improving automated test coverage.
* Deploying the frontend and backend.

---

## Author

**Anthony Chukwuebuka Omeh**

Computer Science Student
Full-Stack Developer / Aspiring Software Developer

Built as part of the **Techstudio Academy Internship**.

---

## License

This project was created for educational and internship purposes.
