Student Admin Panel — MERN + TypeScript

A full-stack Student Admin Panel built using the MERN stack with TypeScript on both the frontend and backend. The main goal of this project is to understand how TypeScript improves workflow, structure, and safety across a full MERN application.
The app allows adding, editing, deleting, and listing student details.

🚀 Tech Stack
Frontend

React.js

TypeScript

Tailwind CSS

Axios

Vite

Backend

Node.js

Express.js

MongoDB

TypeScript

MVC-based folder organization

Basic OOP usage

Simple Dependency Injection setup

🎯 Project Purpose

The purpose of this project is to learn how TypeScript works across both frontend and backend and understand how it improves:

Type safety and early error detection

Better readability & maintainability

Predictable component behavior in React

More structured backend using MVC + OOP

Easier scaling with dependency injection

Better developer experience with autocompletion

This project is intentionally built to follow a real-world-like folder structure but without overcomplicating the architecture.

✨ Features
Frontend

Add new students

Edit student details

Delete student records

List all students

API calls using Axios

Fully typed components & props

Backend

CRUD API for students

MVC-style organization

Controllers handle API logic

Models define MongoDB schema

Routes define endpoints

Simple DI folder for dependency injection setup

Fully typed requests and responses

📁 Folder Structure (High-Level)
Frontend
/frontend
  /src
    /components
    /apis
    /assets
    /components
    /types

Backend
/backend
  /src
    /config
    /controllers
    /DI   (dependency injection setup)
    /models
    /routes

🧪 API Endpoints
Method	Endpoint	Description
GET	/students	List all students
POST	/students	Add a student
PUT	/students/:id	Edit student details
DELETE	/students/:id	Delete a student
⚙️ Installation & Setup
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install
npm run dev


Ensure MongoDB is running locally or connected through your configured URI.

📌 Final Notes

This project was created mainly to understand how TypeScript behaves in a full-stack MERN workflow.
The current structure is simple, clear, and focused on practical learning rather than advanced architectural patterns. It serves as a solid starting point for building more complex TypeScript-based applications.