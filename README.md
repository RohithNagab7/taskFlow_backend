MERN Backend - Admin & Agent Management with Task Distribution

This is the backend for a MERN stack application that allows an Admin to manage Agents, upload CSV files, and automatically distribute tasks among available agents.
It follows a modular architecture with the MVC pattern and includes JWT authentication and secure error handling.

Features
Authentication (Admin)

Admin can register and log in securely.

Passwords are hashed using bcrypt before storage.

JWT tokens are generated upon successful login and sent via HTTP-only cookies.

All protected routes require valid JWT authentication.

Agent Management

Admin can add new agents with:

Name

Email

Mobile (with country code)

Password (securely hashed)

List all agents.

Delete agents (and automatically rebalance distributed tasks).

Task Upload & Distribution

Upload .csv files containing task data:

FirstName, Phone, and Notes columns.

Validates file format and content.

Distributes tasks equally among available agents:

Example: 25 tasks and 5 agents → each agent gets 5 tasks.

If not evenly divisible, remaining tasks are assigned sequentially.

Stores all distributed tasks in MongoDB.

Retrieve all agents with their assigned tasks.

Error & Validation Handling

Centralized errorHandler middleware for consistent error responses.

Input validations handled using Validator.js and custom functions.

Asynchronous routes managed with asyncHandler to avoid repetitive try/catch blocks.

Tech Stack

Backend Framework: Node.js + Express
Database: MongoDB (Mongoose)
Authentication: JWT + bcrypt
File Upload: Multer
CSV Parsing: csv-parse
Security: Helmet, CORS, cookie-parser
