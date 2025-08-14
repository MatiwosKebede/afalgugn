

# System Architecture Design Document
## Afalgugn Project
**Version**: 1.0  
**Date**: August 14, 2025  
**Team Members**:  
1. Samuel Asmare  
2. Dawit Lulie  
3. Furtuna Yimer  
4. Matiwos Kebede  

---

## Table of Contents
1. [Introduction](#1-introduction)  
   1.1. Purpose of the Document  
   1.2. Scope of the System  
   1.3. System Overview  
2. [System Architecture Overview](#2-system-architecture-overview)  
   2.1. Architectural Pattern  
   2.2. High-Level Components  
   2.3. Data Flow  
3. [Technology Stack](#3-technology-stack)  
4. [System Architecture Diagram](#4-system-architecture-diagram)  
5. [Database Integration](#5-database-integration)  
6. [API Design](#6-api-design)  
7. [Authentication and Authorization](#7-authentication-and-authorization)  
8. [Real-Time Features (Chat)](#8-real-time-features-chat)  
9. [Security Measures](#9-security-measures)  
10. [Error Handling](#10-error-handling)  
11. [Logging and Monitoring](#11-logging-and-monitoring)  
12. [Testing Strategy](#12-testing-strategy)  
13. [Deployment and Scalability](#13-deployment-and-scalability)  
14. [Sample Code Snippets](#14-sample-code-snippets)  

---

## 1. Introduction

### 1.1. Purpose of the Document
This document outlines the system architecture for the Afalgugn full-stack web application, detailing the backend, database, and integration components. It builds on the Database Design Document (Version 1.0, August 11, 2025) and Backend Design Document (Version 1.0, August 13, 2025), providing a holistic view of the system's structure, interactions, and design decisions. The document includes a detailed textual description of the system architecture diagram, enabling developers, architects, and stakeholders to understand and implement the system effectively.

### 1.2. Scope of the System
The Afalgugn system encompasses:
- **Frontend**: A web interface for user interaction (e.g., registration, reporting, chatting).
- **Backend**: Handles business logic, API endpoints, and real-time communication.
- **Database**: Stores user data, reports, messages, and subscriptions.
- **External Services**: Email services for verification and notifications.
- **Real-Time Features**: Chat functionality via WebSockets.
- **Security**: Authentication, authorization, and data protection.
- **Scalability**: Infrastructure to handle growing user and data loads.

The system supports user authentication, multilingual functionality, missing and found person reporting, chat, subscriptions, and verification processes.

### 1.3. System Overview
Afalgugn is a web platform designed to assist in locating missing persons and reconnecting them with their families. Users can:
- Register and verify accounts via email.
- Create and manage profiles with additional details.
- Submit and track reports of missing or found persons.
- Communicate via real-time chat.
- Subscribe to notifications for updates.
The system ensures scalability, security, and multilingual support to serve a diverse user base.

---

## 2. System Architecture Overview

### 2.1. Architectural Pattern
The system adopts a **layered architecture** with microservices-inspired modularity, organized using the **MVC (Model-View-Controller)** pattern adapted for APIs:
- **Presentation Layer**: RESTful APIs and WebSocket endpoints for client interaction.
- **Business Logic Layer**: Controllers and services for processing requests (e.g., report validation, user management).
- **Data Access Layer**: Interacts with the MySQL database via Sequelize ORM.
- **Integration Layer**: Connects to external services (e.g., email providers).

This pattern ensures separation of concerns, maintainability, and scalability.

### 2.2. High-Level Components
1. **Client Layer**:
   - Web browsers accessing the frontend (React/Vue.js assumed).
   - Sends HTTP requests to APIs and WebSocket messages for chat.
2. **Load Balancer**:
   - Distributes traffic across backend instances (e.g., AWS ELB, NGINX).
3. **Backend Application**:
   - Node.js with Express.js for RESTful APIs.
   - Socket.io for real-time chat.
   - Modular routes for users, profiles, reports, etc.
4. **Database**:
   - MySQL for relational data storage (see Database Design Document).
   - Redis for caching frequently accessed data (e.g., user sessions, language lists).
5. **External Services**:
   - Email service (e.g., SendGrid, AWS SES) for verification codes and notifications.
   - Optional: File storage (e.g., AWS S3) for future image uploads.
6. **Monitoring and Logging**:
   - Prometheus for metrics, Winston for logging, Grafana for visualization.

### 2.3. Data Flow
1. **Client Request**: Frontend sends HTTP request (e.g., POST /api/v1/users/register) or WebSocket message (e.g., chat message).
2. **Load Balancer**: Routes request to an available backend instance.
3. **Middleware**: Validates input, authenticates JWT, and applies rate limiting.
4. **Controller**: Processes request, calls relevant service.
5. **Service**: Executes business logic, interacts with database via Sequelize.
6. **Database**: MySQL handles CRUD operations; Redis caches results.
7. **External Services**: Sends emails for verification or notifications.
8. **Response**: JSON response for APIs or WebSocket event for chat.

This flow ensures efficient processing and scalability.

---

## 3. Technology Stack
- **Frontend** (Assumed): React.js/Vue.js, Axios for HTTP, Socket.io-client for WebSockets.
- **Backend**:
  - **Runtime**: Node.js (v20.x, LTS for stability).
  - **Framework**: Express.js (for routing and middleware).
  - **Real-Time**: Socket.io (for chat).
  - **Authentication**: JWT (jsonwebtoken), bcrypt for password hashing.
  - **Validation**: express-validator for input sanitization.
  - **Email**: nodemailer with SendGrid/AWS SES.
  - **Logging**: winston (structured logging), morgan (request logging).
- **Database**:
  - **RDBMS**: MySQL (for relational data).
  - **ORM**: Sequelize (for type-safe queries, migrations).
  - **Cache**: Redis (for sessions, frequently accessed data).
- **Infrastructure**:
  - **Containerization**: Docker (for consistent environments).
  - **Orchestration**: Kubernetes (for scaling, optional: AWS ECS).
  - **CI/CD**: GitHub Actions.
  - **Monitoring**: Prometheus, Grafana, PM2.
- **Environment Management**: dotenv for configuration.

This stack is chosen for performance, scalability, and developer familiarity.

---

## 4. System Architecture Diagram
Below is a textual description of the system architecture diagram, designed to be professional and translatable into tools like Lucidchart or Draw.io. The diagram illustrates components, their interactions, and data flow.

### Diagram Description
**Components and Layout**:
- **Client Layer** (Top):
  - **Web Client**: Browser with React/Vue.js frontend.
  - Connects to backend via HTTPS (REST APIs) and WebSocket (chat).
- **Load Balancer** (Below Client):
  - NGINX or AWS ELB, distributing traffic to backend instances.
- **Backend Layer** (Middle):
  - Multiple Node.js instances (Docker containers) running Express.js.
  - **API Gateway**: Handles RESTful routes (/api/v1/users, /reports, etc.).
  - **WebSocket Server**: Socket.io for real-time chat.
  - **Middleware**: Authentication (JWT), validation (express-validator), rate limiting.
- **Database Layer** (Below Backend):
  - **MySQL**: Primary database with tables (Users, Report, Chat, etc.).
  - **Redis**: Cache for sessions and frequently accessed data.
- **External Services** (Right):
  - **Email Service**: SendGrid/AWS SES for verification and notifications.
  - **File Storage** (Optional): AWS S3 for future image uploads.
- **Monitoring and Logging** (Bottom):
  - **Prometheus**: Collects metrics from backend.
  - **Grafana**: Visualizes metrics.
  - **Winston**: Logs to centralized storage.

**Connections**:
- **Client → Load Balancer**: HTTPS for APIs, WebSocket for chat.
- **Load Balancer → Backend**: Distributes requests to Node.js instances.
- **Backend → Database**: Sequelize queries to MySQL; Redis for caching.
- **Backend → External Services**: HTTP/SMTP for emails, S3 for file uploads.
- **Backend → Monitoring**: Metrics to Prometheus, logs to Winston.

**Textual Representation** (for Draw.io/Lucidchart):
```
[Web Client: Browser (React/Vue.js)]
        |
        | HTTPS (REST) / WebSocket (Chat)
        v
[Load Balancer: NGINX/AWS ELB]
        |
        | Distributes traffic
        v
[Backend: Node.js + Express.js (Docker)]
    | REST API (/api/v1/users, /reports, etc.)
    | WebSocket Server (Socket.io)
    | Middleware (JWT, express-validator, rate-limit)
    |
    | Sequelize Queries   | Redis (Caching)
    v                    v
[MySQL Database]      [Redis Cache]
    | Tables: Users, Report, Chat, etc.
    |
    | HTTP/SMTP
    v
[External Services: SendGrid/AWS SES, S3 (Optional)]
    |
    | Metrics/Logs
    v
[Monitoring: Prometheus, Grafana, Winston]
```

**Visualization Instructions**:
- Use rectangles for components (e.g., Client, Backend, Database).
- Use arrows to indicate data flow (e.g., Client → Load Balancer).
- Group backend components in a single box with sub-components (API, WebSocket).
- Color-code layers: Client (blue), Backend (green), Database (orange), External Services (purple), Monitoring (gray).
- Include labels for protocols (HTTPS, WebSocket, SQL).

This diagram can be created in Draw.io or Lucidchart by following the textual layout.

---

## 5. Database Integration
The database schema is defined in the Database Design Document (Version 1.0). Integration uses Sequelize ORM for:
- **Model Definition**: Maps tables (Users, Report, Chat, etc.) to JavaScript objects.
- **Migrations**: Manages schema changes (e.g., adding columns).
- **Transactions**: Ensures atomic operations (e.g., creating a report and updating user stats).
- **Indexing**: Optimizes queries (e.g., index on Report.status).
- **Connection Pooling**: Handles high concurrency.

**Tables** (Summary):
- Users, Profile, Report, Posts, Message, Chat, Subscribe, Verification_Code, Languages.
- Foreign keys enforce relationships (e.g., Report.user_id → Users.user_id).

**Caching**: Redis stores frequently accessed data (e.g., user sessions, language lists) to reduce database load.

---

## 6. API Design
APIs are RESTful, versioned (/api/v1), and modularized using express.Router. Below is a summary of key endpoints:

| Endpoint                  | Method | Description                          | Request Body/Params                  | Response                     |
|---------------------------|--------|--------------------------------------|--------------------------------------|------------------------------|
| /users/register           | POST   | Register a new user                  | { fullname, email, password, language_id } | { user_id, message }        |
| /users/login              | POST   | User login                           | { email, password }                  | { token, user }             |
| /users/verify/:code       | GET    | Verify email with code               | Params: code                         | { message }                  |
| /reports                  | POST   | Submit missing person report         | { person_name, age, location, description } | { report_id }               |
| /reports                  | GET    | Get all reports (filtered)           | Query: status, user_id               | [reports]                   |
| /chats                    | GET    | Get chat history                     | Query: receiver_id                   | [messages]                  |
| /subscriptions            | POST   | Subscribe to notifications           | { email }                            | { subscribe_id }            |

**Pagination**: Use ?page=1&limit=20 for list endpoints.
**Response Format**: JSON with status codes (200, 401, etc.).

---

## 7. Authentication and Authorization
- **Authentication**: JWT for stateless sessions.
  - **Registration**: Hash passwords with bcrypt, send verification email.
  - **Login**: Issue JWT (1-hour expiry).
- **Authorization**: Role-based (user/admin) via Users.role field.
- **Middleware**: Verify JWT for protected routes; Check role for admin actions.
- **Best Practices**: Support refresh tokens; Consider OAuth for federated login.

---

## 8. Real-Time Features (Chat)
- **Technology**: Socket.io for WebSocket communication.
- **Events**:
  - `join`: User joins with user_id.
  - `message`: Sends message to receiver_id.
  - `read`: Marks message as read.
- **Authentication**: Validate JWT on connection.
- **Persistence**: Store messages in Chat table; Update is_read status.
- **Scalability**: Use Redis Pub/Sub for multi-instance Socket.io.

---

## 9. Security Measures
- **Input Validation**: express-validator to prevent XSS/SQL injection.
- **HTTPS**: Enforce in production.
- **Rate Limiting**: express-rate-limit to prevent brute-force attacks.
- **CORS**: Restrict to frontend origin.
- **Secrets**: Use dotenv for environment variables.
- **Dependencies**: Update with npm audit.
- **Database**: Parameterized queries via Sequelize.

---

## 10. Error Handling
- **Centralized Middleware**: Returns JSON { error: message, code }.
- **Status Codes**: 400 (Bad Request), 401 (Unauthorized), 500 (Server Error).
- **Production**: Hide stack traces; Log errors with Winston.

---

## 11. Logging and Monitoring
- **Logging**: Winston for structured logs (JSON format); Morgan for request logs.
- **Monitoring**: Prometheus for metrics (e.g., API latency); Grafana for dashboards.
- **Process Management**: PM2 for Node.js clustering and restarts.
- **Best Practices**: Rotate logs; Alert on critical errors.

---

## 12. Testing Strategy
- **Unit Tests**: Jest for services (e.g., password hashing).
- **Integration Tests**: Supertest for API endpoints.
- **Coverage**: Target 80%+ with istanbul.
- **E2E Tests**: Optional with Cypress for full flows.
- **Mocking**: Mock database and external services for testing.

---

## 13. Deployment and Scalability
- **Deployment**:
  - Docker for containerization.
  - Kubernetes or AWS ECS for orchestration.
  - GitHub Actions for CI/CD.
- **Scalability**:
  - Horizontal scaling with Node.js clustering (PM2).
  - Redis for session sharing and caching.
  - MySQL replication for read-heavy queries.
- **Environments**: Separate dev/staging/prod configs.

---

## 14. Sample Code Snippets
**Server Setup (index.js)**:
```javascript
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const sequelize = require('./config/database');

app.use(express.json());
app.use('/api/v1', require('./routes/index'));

io.use((socket, next) => {
  // JWT authentication
  next();
}).on('connection', (socket) => {
  socket.on('message', async (data) => {
    // Save to Chat table, emit to receiver
  });
});

sequelize.sync().then(() => {
  http.listen(3000, () => console.log('Server running on port 3000'));
});
```

**User Route (routes/users.js)**:
```javascript
const router = require('express').Router();
const { body } = require('express-validator');
const { registerUser } = require('../controllers/users');

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('fullname').trim().notEmpty(),
  body('language_id').isInt()
], registerUser);

module.exports = router;
```

**Controller Example (controllers/users.js)**:
```javascript
const bcrypt = require('bcrypt');
const { User, Verification_Code } = require('../models');
const nodemailer = require('nodemailer');

exports.registerUser = async (req, res, next) => {
  try {
    const { fullname, email, password, language_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashedPassword, language_id });
    const code = Math.random().toString(36).substring(2, 8);
    await Verification_Code.create({ user_id: user.user_id, code, expire_date: new Date(Date.now() + 3600000) });
    // Send email with nodemailer
    res.status(201).json({ user_id: user.user_id, message: 'User registered, verification code sent' });
  } catch (error) {
    next(error);
  }
};
```
