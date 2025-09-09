# Course Management API

## Project Overview
The **Course Management API** is a fully-featured backend system built with **Node.js, Express.js, and MongoDB** (without Mongoose).  
It provides a robust platform for managing courses and users, handling **authentication, course management, and course purchases**. The API is designed using the **MVC pattern**, ensuring a clean separation between routes, controllers, and database logic.  

This API supports:

- User registration and login
- JWT-based authentication with roles (`user` and `admin`)
- Course creation, listing, and deletion
- Secure purchase system preventing duplicate purchases
- Viewing purchased courses with detailed course information

The system is designed for **scalability**, **security**, and easy integration with any frontend, including React, Vue, or mobile apps.

---

## Features

### 1. User Authentication
- JWT-based login and registration
- Secure password hashing with **bcrypt**
- Two user roles:
  - `user`: can browse courses, purchase courses, and view purchased courses
  - `admin`: can create and delete courses, and view all users
- Middleware ensures that only authorized users can access protected routes

### 2. Course Management
- Admin can:
  - Create courses with `title`, `description`, `price`, and `instructor`
  - Delete courses by ID
- Users can:
  - View all courses
  - View a single course by ID
- Course information is stored in MongoDB with unique `_id` identifiers

### 3. Purchase System
- Users can purchase courses securely
- Duplicate purchases by the same user are prevented
- Each purchase stores:
  - `userId` (ObjectId referencing the user)
  - `courseId` (ObjectId referencing the course)
  - `amount` (price of the course at purchase)
  - `date` (timestamp of purchase)
- Users can view all their purchased courses with detailed course information

### 4. Technical Features
- Node.js + Express.js backend
- MongoDB native driver (no Mongoose)
- Follows **MVC pattern**
- Centralized error handling middleware
- Environment variables for configuration
- Designed for serverless deployment (e.g., **Vercel**)
- Input validation and proper status codes for all endpoints

---

## Installation Guide

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/course-management-api.git
cd course-management-api
```