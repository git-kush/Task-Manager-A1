# Task Manager Application

A full-stack task management application built with .NET 8 and React TypeScript.

## Prerequisites

- .NET 8 SDK - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- Node.js (v18 or higher) - Already installed (v22.19.0)
- npm or yarn

## Project Structure

```
task-manager/
├── backend/          # .NET 8 Web API
└── frontend/         # React + TypeScript
```

## Backend Setup (.NET 8)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the API:
```bash
dotnet run
```

The API will be available at [here](https://assignment1-g5iy.onrender.com)

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/{id} | Update task completion status |
| DELETE | /api/tasks/{id} | Delete a task |

## Frontend Setup (React + TypeScript)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at [here](https://assignment1-xi-sage.vercel.app)

## Features

- Display list of tasks
- Add new tasks with descriptions
- Mark tasks as completed/uncompleted
- Delete tasks
- Filter tasks (All / Active / Completed)
- Responsive design with Tailwind CSS
- LocalStorage persistence
- Clean and minimal UI

## Technology Stack

### Backend
- .NET 8 Core
- ASP.NET Core Web API
- In-memory data storage
- CORS enabled

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- React Hooks for state management

## Development Notes

- The backend uses in-memory storage, so data will be lost on server restart
- The frontend uses localStorage for persistence across browser sessions
- CORS is configured to allow requests from the frontend development server
