# MERN Backend - Admin & Agent Management with Task Distribution

This is the backend for a MERN stack application that allows an Admin to manage Agents, upload CSV files, and automatically distribute tasks among available agents.  
It follows a modular architecture with the **MVC pattern**, includes **JWT authentication**, and ensures **secure error handling** throughout.

---

## Features

### Authentication (Admin)
- Admin can securely **register** and **log in**.  
- Passwords are hashed using **bcrypt** before being stored in MongoDB.  
- **JWT tokens** are generated upon successful login and sent via **HTTP-only cookies**.  
- All protected routes require a **valid JWT token** for access.

---

### Agent Management
- Admin can:
  - **Add new agents** with the following details:
    - Name  
    - Email  
    - Mobile (with country code)  
    - Password (securely hashed)
  - **List all agents.**
  - **Delete agents**, which automatically triggers **task redistribution** among the remaining agents.

---

### Task Upload & Distribution
- Upload **.csv files** containing task data with columns:
  - `FirstName`, `Phone`, and `Notes`.
- The file is validated for format and content before processing.  
- Tasks are **distributed equally** among all available agents:
  - Example: 25 tasks and 5 agents → each agent gets 5 tasks.
  - If the count is not evenly divisible, remaining tasks are assigned sequentially.
- Distributed tasks are **stored in MongoDB**.
- Provides an endpoint to **retrieve all agents along with their assigned tasks**.

---

### Error & Validation Handling
- **Centralized `errorHandler` middleware** ensures consistent error responses.  
- **Input validations** handled via Validator.js and custom validation logic.  
- **Async operations** wrapped using `asyncHandler` to prevent repetitive try/catch blocks and unhandled promise rejections.

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| **Backend Framework** | Node.js + Express |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT + bcrypt |
| **File Upload** | Multer |
| **CSV Parsing** | csv-parser |
| **Security** | Helmet, CORS, cookie-parser |


## Folder Structure

