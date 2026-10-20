# TaskDuty — Full-Stack Task Manager

**TaskDuty** is a full-stack task management application built with React, TypeScript, Node.js, Express, and MongoDB. It allows users to create accounts, authenticate securely, and manage their own tasks through a responsive web interface backed by a REST API.

The project was developed during my **Techstudio Academy online internship** and has since become my independent project. It represents my practical application of full-stack development concepts, including REST API design, authentication, authorization, database modelling, validation, search functionality, deployment, and version control.

TaskDuty is deployed and operational, with its frontend hosted on Vercel and its backend hosted on Render.

## Live Application

* **Live application:** [TaskDuty on Vercel](https://tech-studio-academy-task-manager.vercel.app/)
* **Backend API:** [TaskDuty API on Render](https://taskduty-api-6yvk.onrender.com)
* **Source code:** See the GitHub repository containing this project.

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Development Journey](#development-journey)
* [Technology Stack](#technology-stack)
* [Application Architecture](#application-architecture)
* [Project Structure](#project-structure)
* [Data Models](#data-models)
* [API Documentation](#api-documentation)
* [Authentication and Authorization](#authentication-and-authorization)
* [Task Search](#task-search)
* [Validation and Error Handling](#validation-and-error-handling)
* [Deployment and Environment Configuration](#deployment-and-environment-configuration)
* [Getting Started](#getting-started)
* [Running the Application Locally](#running-the-application-locally)
* [Testing](#testing)
* [Git Workflow](#git-workflow)
* [Key Learnings](#key-learnings)
* [Future Improvements](#future-improvements)
* [Author](#author)

---

## Project Overview

TaskDuty provides an interface for managing everyday tasks. Users can create tasks, view their task lists, update existing tasks, delete tasks, and search for tasks by title or description.

Each task can contain:

* Title
* Description
* Due date
* Category
* Completion status
* User ownership

The application separates the frontend, backend, and database responsibilities.

The React frontend handles the user interface and interactions. The Express backend exposes REST API endpoints, validates requests, enforces authentication and authorization, and communicates with MongoDB through Mongoose.

This separation makes the application easier to understand, maintain, and extend.

## Features

### 1. User Registration and Login

Users can register an account and authenticate using their credentials.

The backend uses bcrypt for password hashing and JSON Web Tokens (JWT) to authenticate requests to protected endpoints.

### 2. Task Creation

Authenticated users can create tasks with details such as the title, description, due date, category, and completion status.

The backend validates incoming task data before saving it to MongoDB.

### 3. Task Retrieval

Users can retrieve their task lists and access individual tasks they are authorized to view.

Task ownership is enforced on the backend to prevent users from accessing other users' tasks.

### 4. Task Updating

Users can update their own tasks, including their task details and completion status.

### 5. Task Deletion

Users can delete tasks they own. The interface updates to reflect successful operations.

### 6. Task Search

Users can search their tasks by title or description.

Search supports case-insensitive matching and is implemented across the frontend and backend.

### 7. Category Filtering

Users can filter tasks by category to focus on particular types of work.

### 8. Completion-Status Filtering

Users can filter tasks by their completion status, including completed and pending tasks.

### 9. Authentication-Protected Routes

The application protects authenticated pages and task operations. The backend also checks resource ownership rather than relying solely on frontend restrictions.

### 10. Responsive User Interface

The frontend uses Tailwind CSS to provide a clean interface that adapts to different screen sizes.

### 11. Loading and Error States

The frontend handles asynchronous requests and communicates loading states and request failures to users.

### 12. Production Deployment

The frontend and backend are deployed separately, allowing each application to be built and maintained independently.

Vercel is configured to serve the React application correctly when users navigate directly to a route or refresh a page.

---

## Development Journey

TaskDuty developed through three main stages.

### Stage 1 — Core Task Management

The first stage established the foundation of the application.

Key implementations included:

* React components and state management.
* Controlled form inputs.
* CRUD operations.
* Express routes and controllers.
* MongoDB integration using Mongoose.
* Zod validation.
* Frontend and backend communication.
* Task categories, due dates, and completion status.

This stage provided practical experience connecting a frontend interface to a backend API and persisting application data in a database.

### Stage 2 — Authentication and Authorization

The second stage introduced account management and access control.

Key implementations included:

* User registration and login.
* Password hashing with bcrypt.
* JWT generation and verification.
* Authentication middleware.
* Protected task endpoints.
* User-specific task ownership.
* Resource-level authorization.

The backend associates tasks with their owners and checks the authenticated user's identity when processing protected task operations.

This established the foundation for keeping each user's task data separate from other users' data.

### Stage 3 — Task Search

The third stage introduced search functionality.

The frontend sends the search term to the backend through a URL query parameter.

For example:

`GET /tasks?search=assignment`

The backend uses MongoDB query conditions to find tasks whose titles or descriptions match the search term.

The implementation supports case-insensitive matching and works alongside the application's category and completion-status filters.

### Production Deployment

Following implementation, TaskDuty was deployed to production.

The frontend is hosted on Vercel, while the backend is hosted on Render. The frontend uses environment-based API configuration to communicate with the deployed backend.

A Vercel rewrite configuration was also added to resolve page-refresh errors on client-side routes.

The deployed application has been tested for authentication, task operations, search, page refreshes, and isolation of tasks between user accounts.

---

## Technology Stack

### Frontend

| Technology       | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| React            | Building the user interface                              |
| TypeScript       | Static typing and improved maintainability               |
| Vite             | Frontend development server and production build tooling |
| React Router DOM | Client-side navigation and route management              |
| Tailwind CSS     | Styling and responsive layouts                           |
| Lucide React     | Icons                                                    |
| Fetch API        | Communication with the backend REST API                  |

### Backend

| Technology | Purpose                                        |
| ---------- | ---------------------------------------------- |
| Node.js    | JavaScript runtime                             |
| Express.js | HTTP server and API routing                    |
| TypeScript | Type safety in backend code                    |
| REST API   | Communication between the frontend and backend |

### Database

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| MongoDB    | Persistent application data storage   |
| Mongoose   | Database models, schemas, and queries |

### Authentication and Validation

| Technology            | Purpose                               |
| --------------------- | ------------------------------------- |
| JSON Web Tokens (JWT) | Authenticating protected API requests |
| bcrypt                | Password hashing                      |
| Zod                   | Request-data validation               |
| Express middleware    | Authentication and request processing |

### Development and Deployment Tools

* Visual Studio Code
* Git and GitHub
* npm
* Postman
* Vercel
* Render
* MongoDB Atlas

---

## Application Architecture

TaskDuty follows a client-server architecture.

The frontend and backend are separate applications that communicate through HTTP requests.

### Request Flow

```text
                  USER
                    |
                    v
          React + TypeScript
              Frontend
                    |
                    v
             Fetch API
                    |
                    v
           Express REST API
                    |
                    v
       Authentication Middleware
          (protected routes)
                    |
                    v
              Controllers
                    |
                    v
           Zod Validation
          (where applicable)
                    |
                    v
          Mongoose Models
                    |
                    v
                MongoDB
                    |
                    v
            HTTP Response
                    |
                    v
          Frontend Updates UI
```

### Frontend Responsibilities

The frontend is responsible for:

* Rendering the application interface.
* Managing form inputs and component state.
* Handling client-side navigation.
* Sending requests to the backend.
* Displaying task lists and search results.
* Communicating loading and error states.
* Providing the user with controls for task management.

### Backend Responsibilities

The backend is responsible for:

* Exposing REST API endpoints.
* Validating incoming requests.
* Authenticating users.
* Enforcing resource ownership.
* Processing task operations.
* Interacting with MongoDB through Mongoose.
* Returning appropriate HTTP responses.

### Database Responsibilities

MongoDB stores user and task documents.

Mongoose provides the models and query operations used by the backend to create, retrieve, update, and delete records.

---

## Project Structure

The principal project directories are organised as follows.

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
|   |   |   ├── Login.tsx
|   |   |   ├── Register.tsx
|   |   |   ├── MyTask.tsx
|   |   |   ├── NewTask.tsx
|   |   |   └── EditTask.tsx
|   |   |
|   |   ├── config.ts
|   |   ├── App.tsx
|   |   └── main.tsx
|   |
|   ├── vercel.json
|   ├── package.json
|   └── tsconfig.json
|
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

*Note: This is a documentation-level overview of the principal files. Additional configuration and supporting files may exist in the repository.*

---

## Data Models

### User Model

The user model represents an account registered with TaskDuty.

Conceptually, a user record contains:

```text
User
├── _id
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

The exact fields depend on the implementation in the user model.

Passwords should be stored as bcrypt hashes rather than plaintext values.

### Task Model

The task model represents an individual task.

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

When an authenticated user creates a task, the backend derives ownership from the authenticated request rather than trusting an arbitrary user ID supplied by the client.

This association supports user-scoped task retrieval and resource-level authorization.

---

## API Documentation

The backend API runs locally on port `3000` by default.

In production, the API is hosted at:

`https://taskduty-api-6yvk.onrender.com`

The endpoints below describe the application's API interface.

### Authentication Endpoints

| Method | Endpoint         | Purpose                              |
| ------ | ---------------- | ------------------------------------ |
| POST   | `/auth/register` | Register a new user                  |
| POST   | `/auth/login`    | Authenticate a user and obtain a JWT |

### Task Endpoints

| Method | Endpoint     | Authentication | Purpose                                                                |
| ------ | ------------ | -------------- | ---------------------------------------------------------------------- |
| POST   | `/tasks`     | Required       | Create a task                                                          |
| GET    | `/tasks`     | Required       | Retrieve the authenticated user's tasks, optionally filtered by search |
| GET    | `/tasks/:id` | Required       | Retrieve a specific task owned by the user                             |
| PUT    | `/tasks/:id` | Required       | Update a task owned by the user                                        |
| DELETE | `/tasks/:id` | Required       | Delete a task owned by the user                                        |

### Authentication Header

Protected requests use a bearer token in the HTTP `Authorization` header.

```http
Authorization: Bearer <token>
```

The backend authentication middleware verifies the token and makes the authenticated user's identity available to the relevant controllers.

### Registering a User

```http
POST /auth/register
Content-Type: application/json
```

The request body must follow the registration validation schema defined by the backend.

### Logging In

```http
POST /auth/login
Content-Type: application/json
```

The client submits the user's credentials. If they are valid, the backend returns the authentication response containing the JWT.

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

The example assumes that the supplied date and category satisfy the application's validation rules.

### Retrieving Tasks

```http
GET /tasks
Authorization: Bearer <token>
```

The authenticated user's task list is returned according to the backend query and ownership rules.

### Searching Tasks

```http
GET /tasks?search=assignment
Authorization: Bearer <token>
```

The optional `search` parameter filters the authenticated user's tasks by title or description.

### Retrieving a Specific Task

```http
GET /tasks/:id
Authorization: Bearer <token>
```

The backend checks that the requested task exists and belongs to the authenticated user.

### Updating a Task

```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json
```

The backend validates the update and checks the applicable ownership rules.

### Deleting a Task

```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

The backend checks the task's ownership before performing the deletion.

*For exact request and response schemas, refer to the validation schemas and controller implementations in the API source code.*

---

## Authentication and Authorization

Authentication and authorization are related but distinct concepts.

### Authentication: Who Is Making the Request?

TaskDuty uses email/password authentication and JSON Web Tokens.

The general flow is:

```text
User submits credentials
          |
          v
Backend validates credentials
          |
          v
Backend generates JWT
          |
          v
Client receives authentication response
          |
          v
Client sends token with protected requests
          |
          v
Authentication middleware verifies token
```

### Authorization: What Can the User Access?

After authentication, the backend must determine whether the user is permitted to access a requested resource.

TaskDuty associates tasks with their owners and checks the authenticated user's ID when processing protected task operations.

This ensures that a user cannot access or modify another user's tasks merely by changing a task ID in an API request.

**An important security principle:** Hiding a page or button in the frontend is not sufficient authorization. The backend must enforce the access rules independently.

The deployed application has been tested to confirm that separate user accounts access their own tasks rather than one another's.

---

## Task Search

Task search is implemented across the React frontend and Express backend.

### Frontend Implementation

The task page maintains the search term in React state.

When the search term changes, the frontend requests the task-list endpoint with the term encoded as a URL query parameter.

For example:

```text
User enters search term
          |
          v
React updates search state
          |
          v
Frontend requests GET /tasks?search=...
          |
          v
Backend applies search conditions
          |
          v
Matching tasks are returned
          |
          v
Frontend displays the results
```

### Backend Implementation

The backend reads the optional `search` query parameter.

When a search term is supplied, the database query matches the task title or description using case-insensitive regular-expression conditions.

Conceptually:

```text
Task matches if:

title contains the search term

OR

description contains the search term
```

The task query also enforces user ownership, ensuring that search results remain limited to the authenticated user's tasks.

### Search and Filtering

The application supports searching alongside category and completion-status filters.

Search identifies matching tasks through the backend, while the frontend applies the selected category and status filters to the returned results.

A task must satisfy the search criteria and the active filters to appear in the final displayed list.

---

## Validation and Error Handling

TaskDuty uses Zod to validate incoming data in relevant authentication and task operations.

Depending on the endpoint and validation schema, checks may include:

* Required fields.
* Email format.
* Password requirements.
* Task title and description.
* Due-date format and constraints.
* Category values.
* Completion status.
* MongoDB document IDs.
* Request-body structure.

Validation helps prevent malformed data from reaching database operations.

The frontend also manages asynchronous requests and communicates loading states and errors to users.

---

## Deployment and Environment Configuration

TaskDuty is deployed as two separate applications.

| Component | Platform      | Configuration                                             |
| --------- | ------------- | --------------------------------------------------------- |
| Frontend  | Vercel        | Vite production build                                     |
| Backend   | Render        | Node.js and Express API                                   |
| Database  | MongoDB Atlas | Database connection through backend environment variables |

### Frontend Configuration

The frontend uses `web/src/config.ts` to centralise the API base URL.

```ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default API_URL;
```

In local development, the application uses `http://localhost:3000` when no environment variable is configured.

In production, Vercel supplies the `VITE_API_URL` environment variable pointing to the deployed Render backend.

Vite environment variables prefixed with `VITE_` are exposed to the frontend bundle. They must not contain private secrets.

### Vercel Routing Configuration

The frontend includes `web/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration ensures that Vercel serves the React application's entry point for client-side routes.

Without an appropriate fallback, directly refreshing a route may cause the hosting platform to return a 404 because the route is handled by React rather than an individual file on the server.

### Backend Environment Variables

Create an `.env` file inside the `api` directory for local development.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
```

The actual variable names must match those read by the backend configuration.

Set the corresponding production environment variables in Render.

**Never commit real database credentials, JWT secrets, or other private environment variables to GitHub.** Keep `.env` files excluded through `.gitignore`.

---

## Getting Started

### Prerequisites

Install the following tools:

* Node.js.
* npm.
* Git.
* Access to a MongoDB database, such as MongoDB Atlas.
* A code editor such as Visual Studio Code.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Task-manager
```

Replace `<your-repository-url>` with the actual URL of your GitHub repository.

### 2. Install Root Dependencies

From the project root:

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

Create `api/.env` and configure the MongoDB connection, JWT secret, and other environment variables required by the backend.

For local development, the frontend can use the default API address in `web/src/config.ts`.

If you configure `VITE_API_URL` locally, set it to the intended backend address.

---

## Running the Application Locally

The commands depend on the scripts defined in the root and individual `package.json` files.

### Run Both Applications

If the root development script is configured to start the frontend and backend together, run this from the project root:

```bash
npm run dev
```

### Run the Backend Separately

```bash
cd api
npm run dev
```

### Run the Frontend Separately

In another terminal:

```bash
cd web
npm run dev
```

The Vite development server commonly uses:

`http://localhost:5173`

The Express backend uses port `3000` by default.

The actual commands and ports depend on the project's configuration.

---

## Testing

The following test scenarios provide a practical checklist for verifying TaskDuty.

### Authentication Tests

1. Register a test account.
2. Log in using the account credentials.
3. Confirm that authentication succeeds.
4. Attempt to access protected endpoints without a valid token.
5. Confirm that protected operations reject unauthenticated requests.

### Task Management Tests

1. Create a task.
2. Retrieve the task list.
3. Open a specific task.
4. Update the task.
5. Mark a task as completed or pending.
6. Delete the task.
7. Confirm that the interface reflects successful operations.

### Search and Filtering Tests

| Test                               | Expected Behaviour                              |
| ---------------------------------- | ----------------------------------------------- |
| Search by title                    | Matching tasks appear                           |
| Search by description              | Matching tasks appear                           |
| Search with different letter cases | Matching remains case-insensitive               |
| Search for nonexistent text        | No matching tasks appear                        |
| Clear the search input             | The normal task list returns                    |
| Apply a category filter            | Only matching-category tasks remain             |
| Apply a status filter              | Only tasks matching the selected status remain  |
| Combine search and filters         | Results satisfy the search and selected filters |

### Authorization Tests

1. Create User A and User B.
2. Create a task under User A.
3. Log in as User B.
4. Attempt to retrieve, edit, or delete User A's task using User B's token.
5. Confirm that the backend denies access to the task.
6. Confirm that each user's task list contains only their own tasks.

### Build Checks

To check the frontend production build:

```bash
cd web
npm run build
```

To run a TypeScript check in the backend:

```bash
cd api
npx tsc --noEmit
```

These commands help identify build and type errors. They do not replace integration tests or security testing.

---

## Git Workflow

Git and GitHub were used to track changes throughout the development process.

The `task-search` feature branch was used for implementing the search functionality before integration with `main`.

The workflow included:

1. Creating or switching to a feature branch.
2. Implementing the feature.
3. Reviewing changes with `git status`.
4. Committing changes with meaningful messages.
5. Pushing changes to GitHub.
6. Integrating changes into `main`.
7. Deploying the production branch.

The production routing fix was committed as:

```text
c006e92 Fix Vercel SPA route refresh
```

This commit introduced the Vercel rewrite configuration that resolved the refresh-related 404 issue.

The deployed application was then tested to confirm that direct navigation and browser refreshes worked correctly.

---

## Key Learnings

Building and deploying TaskDuty strengthened my understanding of full-stack application development.

### Frontend Development

* React components and state management.
* Controlled form inputs.
* Client-side routing.
* TypeScript in React applications.
* Asynchronous requests.
* Loading and error states.
* Frontend and backend integration.

### Backend Development

* REST API design.
* Express routing and middleware.
* CRUD operations.
* Controller and model responsibilities.
* Request validation.
* MongoDB queries.
* Mongoose data modelling.

### Authentication and Authorization

* Password hashing with bcrypt.
* JWT generation and verification.
* Authentication middleware.
* Protected API endpoints.
* Resource ownership.
* User-scoped database queries.

### Search and Data Handling

* URL query parameters.
* Case-insensitive search.
* MongoDB query conditions.
* Combining backend search with frontend filtering.

### Deployment and Version Control

* Environment-based API configuration.
* Frontend and backend deployment.
* Git branching and merging.
* Production build checks.
* Diagnosing client-side routing issues on Vercel.
* Maintaining a stable production branch.

One of the most important concepts reinforced through this project is the distinction between authentication and authorization:

**Authentication establishes who the user is. Authorization determines what that user is allowed to access or do.**

The project also demonstrated that successful local development does not automatically guarantee a working production deployment. Frontend configuration, backend availability, environment variables, routing, and data access rules all need to work together.

---

## Future Improvements

Although the core application is operational, TaskDuty can be extended further.

Potential improvements include:

* Debounced search to reduce unnecessary requests.
* Pagination for larger task collections.
* Sorting by due date and creation date.
* Task priorities and labels.
* Dashboard statistics.
* Toast notifications.
* More comprehensive automated tests.
* Improved accessibility.
* Stronger monitoring and production logging.
* Additional security hardening and rate limiting.
* Task reminders and notifications.

These are possible future enhancements rather than unfinished requirements for the application's current core functionality.

---

## Author

**Anthony Chukwuebuka Omeh**

Computer Science Student | Full-Stack Developer

TaskDuty was developed during my Techstudio Academy online internship and is now my independent project.

The project reflects my continued learning and practical experience building, securing, deploying, and maintaining full-stack web applications.

---

## License

Unless a specific licence has been added to the repository, the project should be treated as having no explicitly granted open-source licence.

As the project owner, I can choose and add an appropriate licence if I decide to permit others to use, modify, or distribute the source code.
