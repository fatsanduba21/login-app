# Gemini Project Configuration

## Project Overview
description: A full-stack user authentication application. The frontend is a React single-page application, and the backend is a Node.js/Express server that provides API endpoints for user login and registration.

## Technologies
frameworks:
  - React
  - Node.js
  - Express
  - Sequelize
  - SQLite
  - Passport.js

## Project Structure
architecture:
  - The frontend React application is located in the `src/` directory.
  - The backend Express server is in the `server/` directory.
  - The main server entry point is `server/index.js`.
  - The SQLite database is at `server/database.sqlite`.
  - API routes are defined in `server/routes/`.
  - Database models are defined in `server/models/`.

## Commands
# Commands should be run from the `login-app` directory.

# Frontend (from root `login-app` directory)
start_client:
  command: npm start
  description: Starts the React development server.

build_client:
  command: npm run build
  description: Builds the React application for production.

test_client:
  command: npm test
  description: Runs the frontend tests using Jest and React Testing Library.

# Backend (from root `login-app` directory)
start_server:
  command: node server/index.js
  description: Starts the backend Express server.

# To run both client and server concurrently, you can use two separate terminals.
