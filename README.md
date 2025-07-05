# 221501152

Sure! Here's a clean and professional `README.md` without emojis or decorative elements, written in a standard GitHub-style format. It covers:

* About the project
* Folder structure
* How to run
* Dependencies
* API overview
* Logging function usage

---

```markdown
# Logging Middleware and Backend Evaluation System

This project implements a Node.js/Express backend with a reusable logging middleware. The middleware sends structured logs to a protected Evaluation Server API. The application supports user registration, authentication, and secure event logging across different layers of the application.

## About the Project

The logging middleware captures application-level events (such as handler errors, DB failures, and API actions) and sends logs in the format specified by the evaluation server. Each log contains:

- Stack (`backend` or `frontend`)
- Level (`debug`, `info`, `warn`, `error`, `fatal`)

## Project Structure

```

project-root/
├── logging-middleware/
│   └── logger.js           # Reusable logging module
├── backend/
│   └── index.js            # Express app using logger
├── frontend/               # (optional) React app
└── README.md

````

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
````

2. Install backend dependencies:

```bash
npm install
```

3. Configure authentication inside `index.js` using credentials provided during registration:

```js
authenticateLogger({
  email: "your_email",
  name: "your_name",
  rollNo: "your_roll_no",
  accessCode: "provided_access_code",
  clientID: "your_client_id",
  clientSecret: "your_client_secret"
});
```

4. Start the backend server:

```bash
node backend/index.js
```

## Dependencies

* express
* cors
* axios
* fs (for optional local logging)
* path (for file paths)

These are installed using:

```bash
npm install express cors axios
```

## Logging Middleware

The logging middleware provides a reusable function:

```js
Log(stack, level, package, message)
```

### Example:

```js
await Log("backend", "error", "handler", "Missing required fields");
await Log("backend", "fatal", "db", "Database connection failed");
```

### API Endpoint for Logging:

```
POST http://20.244.56.144/evaluation-service/logs
Authorization: Bearer <token>
```

Payload:

```json
{
  "stack": "backend",
  "level": "error",
  "package": "handler",
  "message": "Description of the event"
}
```

## Backend Routes

| Method | Route         | Description                        |
| ------ | ------------- | ---------------------------------- |
| POST   | `/`           | Accepts URL, custom name, and time |
| GET    | `/:shortName` | Redirects to the original long URL |


## Notes

* Only registered users with valid credentials can send logs
* Each log should be meaningful, capturing the state or failure
* Logs are expected to be integrated at critical points of the app

```

