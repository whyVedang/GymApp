# GymApp

A full-stack MERN application for tracking workout progress with animated UI components, real-time updates, and seamless data management.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Express](https://img.shields.io/badge/Express-5-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4)

## ✨ Features

- **Beautiful UI** with animated components using Framer Motion
- **Responsive Design** that works on any device
- **Real-time Data Management** for workout tracking
- **Modern Tech Stack** using MongoDB, Express, React and Node.js
- **Interactive Animations** for enhanced user experience

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas connection)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/GymApp.git
cd GymApp
```

2. **Set up backend**

```bash
cd backend
npm install

# Create a .env file with your MongoDB connection string:
# MONGO_URI=mongodb://localhost:27017/GymApp
# PORT=4000

npm start
```

3. **Set up frontend**

```bash
cd ../frontend
npm install
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
GymApp/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── Form.jsx    # Add workout form
│   │   │   └── Navbar.jsx  # Navigation component
│   │   ├── contexts/       # Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.jsx         # Main app with router setup
│   │   └── gymexe.jsx      # Workout display component
├── backend/                # Express server
│   ├── routes/             # API endpoints
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # Route handlers
│   └── server.js           # Server configuration
```

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /workouts | Fetch all workouts |
| POST | /workouts | Create new workout |
| DELETE | /workouts/:id | Delete a workout |
| PATCH | /workouts/:id | Update a workout |

## 📝 MERN Stack Learning Points

This project demonstrates several key MERN development concepts:

- **MongoDB/Mongoose**: Data modeling and CRUD operations
- **Express**: RESTful API development and middleware configuration
- **React**: Component-based UI with hooks and context API
- **Node.js**: Server-side JavaScript runtime

## 💻 Development Concepts Covered

- React Router implementation with nested routes
- Framer Motion for UI animations
- MongoDB/Mongoose for data modeling
- Context API for state management
- Express middleware configuration
- Modern React hooks pattern

## Tech Stack

**Frontend:** 
- React 19
- Tailwind CSS 4
- Framer Motion
- React Router 7
- Date-fns

**Backend:** 
- Node.js
- Express 5
- MongoDB
- Mongoose 8
- CORS
- dotenv

## Next Steps

1. Add user authentication
2. Implement workout statistics
3. Add exercise categories
4. Create mobile app version

## 🙏 Acknowledgments

- [ReactJS](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB](https://www.mongodb.com)
- [Express.js](https://expressjs.com)
