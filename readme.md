# JobPilot AI

JobPilot AI is a full-stack job search management application that aims to help job seekers track applications, monitor application progress, analyse job opportunities, and eventually use AI to assist with different parts of the job-search process.

The project is being built incrementally, starting with a traditional full-stack application before introducing AI agents, email integration, automated job tracking, job-fit analysis, recruiter research, and reporting.

## Current Status

The first version currently provides a full-stack CRUD application for managing job applications.

Users can:

- Add a job
- View all jobs
- View individual jobs through the API
- Update an existing job
- Delete a job
- Track the current application status

Example statuses include:

- `NEW`
- `APPLIED`
- `INTERVIEW`
- `REJECTED`

Job data is persisted in MongoDB Atlas.

## Planned Features

JobPilot AI is intended to grow beyond a basic job tracker.

Future features include:

- Gmail integration using Google OAuth
- Detect job-alert emails
- Detect application confirmation emails
- Detect interview invitations and rejection emails
- Automatically update application status
- Analyse job descriptions using AI
- Compare job requirements against a CV/profile
- Identify strengths and skill gaps
- Suggest relevant CV improvements
- Research publicly available recruiter/contact information
- Generate recruiter outreach drafts
- Generate daily job-search reports
- Track application and interview conversion metrics
- Human approval before actions such as sending emails
- AI agent tool calling and decision-making

The goal is to build an AI-assisted job-search agent while keeping important actions under user control.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Fetch API

### Backend

- Node.js
- Express
- TypeScript
- Mongoose

### Database

- MongoDB Atlas

### Planned

- OpenAI API
- Gmail API
- Google OAuth 2.0
- Zod
- Scheduled jobs
- Docker
- GitHub Actions

## Architecture

```text
React + TypeScript
       |
       | HTTP / REST
       v
Node.js + Express
       |
       | Mongoose
       v
MongoDB Atlas
```

As AI capabilities are introduced, the architecture will evolve towards:

```text
                    React
                      |
                      v
               Node / Express
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       MongoDB     AI Model    External Tools
                                |
                         +------+------+
                         |             |
                       Gmail       Job/Recruiter
                                    Research
```

## Project Structure

```text
jobpilot-ai/
│
├── client/                 # React + TypeScript frontend
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── models/
│   │   │   └── Job.ts
│   │   └── index.ts
│   ├── package.json
│   ├── .env
│   └── ...
│
└── README.md
```

## Prerequisites

Before running the project, install:

- Node.js
- npm
- A MongoDB Atlas account

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGODB_URI=your_mongodb_connection_string
```

Do not commit the `.env` file to Git.

Make sure `.gitignore` contains:

```text
node_modules/
.env
```

## Running the Project

You currently need two terminals: one for the backend and one for the frontend.

### 1. Start the Backend

From the project root:

```bash
cd server
npm install
npm run dev
```

The Express API should start on:

```text
http://localhost:3000
```

You should see:

```text
Connected to MongoDB
Server running on port 3000
```

### 2. Start the Frontend

Open another terminal and, from the project root, run:

```bash
cd client
npm install
npm run dev
```

Vite should start the React application, normally on:

```text
http://localhost:5173
```

Open that address in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check whether the API is running |
| `GET` | `/jobs` | Get all jobs |
| `GET` | `/jobs/:id` | Get a job by ID |
| `POST` | `/jobs` | Create a job |
| `PATCH` | `/jobs/:id` | Update a job |
| `DELETE` | `/jobs/:id` | Delete a job |

## Example Job

```json
{
  "company": "Example Company",
  "role": "Senior Frontend Engineer",
  "status": "APPLIED"
}
```

MongoDB generates an `_id` for each stored job.

## Current Request Flow

For example, when a user creates a job:

```text
User completes React form
        |
        v
POST /jobs
        |
        v
Express API
        |
        v
Mongoose Job Model
        |
        v
MongoDB Atlas
        |
        v
Created Job
        |
        v
Express Response
        |
        v
React UI
```

## Why I Am Building This

Managing a job search can involve multiple systems: job boards, email, recruiters, calendars, applications, interviews, CV versions, and follow-ups.

It can become difficult to answer simple questions such as:

- Which jobs have I applied for?
- Which applications are waiting for a response?
- Have I received an interview or rejection email?
- Which new jobs are a strong match for my experience?
- Which recruiter should I contact?
- Which applications need follow-up?
- How successful are my applications?

JobPilot AI aims to bring this information together and eventually use an AI agent to help analyse and organise it.

## Development Approach

The project is deliberately being built in stages.

### Phase 1 — Full-Stack Foundation

- React frontend
- Express REST API
- MongoDB persistence
- CRUD operations

### Phase 2 — Application Structure

- Componentise the frontend
- Improve backend architecture
- Request validation
- Improved Job data model
- Error and loading states

### Phase 3 — AI Job Analysis

- Job-description analysis
- Job/profile comparison
- Strength and gap identification
- CV improvement suggestions
- Structured AI responses

### Phase 4 — Email Integration

- Google OAuth
- Gmail API
- Job email classification
- Application confirmation detection
- Interview detection
- Rejection detection

### Phase 5 — AI Agent

- Tool calling
- Persistent state
- Agent decision flow
- Recruiter research
- Outreach generation
- Human approval for sensitive actions

### Phase 6 — Automation & Analytics

- Scheduled email checks
- Daily job-search summary
- Application funnel analytics
- Interview conversion tracking
- CI/CD and deployment

## Security

Sensitive information such as database credentials and API keys must be stored in environment variables and must never be committed to the repository.

The application will also use human approval before potentially sensitive actions such as sending recruiter emails.

## Learning Goals

This project is also being used to explore and demonstrate:

- Full-stack TypeScript development
- REST API design
- MongoDB and Mongoose
- React application architecture
- Authentication and OAuth
- AI API integration
- Structured LLM outputs
- Tool calling
- AI agent architecture
- Human-in-the-loop workflows
- Testing
- CI/CD
- Docker and deployment

## Author

**Parvez Shaikh**

Senior Frontend / Software Engineer

Building JobPilot AI as a practical exploration of full-stack development and AI agent engineering.