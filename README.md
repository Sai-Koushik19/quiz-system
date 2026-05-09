# 🎯 Quiz System

A full-stack Quiz Application built using the MERN Stack where users can register, attempt quizzes, view scores, and compete on the leaderboard, while admins can create and manage quizzes dynamically.

---

# 🚀 Features

## 👨‍🎓 User Features
- User Registration & Login
- Secure Authentication using JWT
- Attempt Quizzes
- Timer-based Quiz System
- Instant Score Calculation
- View Quiz Results
- Leaderboard Ranking
- Responsive UI

## 👨‍💼 Admin Features
- Admin Login
- Create New Quizzes
- Add Questions Dynamically
- Manage Quiz Questions
- View Participants
- Leaderboard Monitoring

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcrypt.js

---

# 📂 Project Structure

```bash
quiz-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/quiz-system.git
2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend server:

npm start
3️⃣ Frontend Setup

Open new terminal:

cd frontend
npm install
npm start
🌐 Application Flow
User/Admin Login
Admin Creates Quiz
Users Attempt Quiz
System Calculates Score
Leaderboard Updates Automatically
🔐 Authentication
Passwords are encrypted using bcrypt
JWT Tokens used for secure login sessions
Protected Routes implemented
📸 Screens Included
Login Page
Register Page
Admin Dashboard
Quiz Page
Result Page
Leaderboard
📈 Future Enhancements
Quiz Categories
Difficulty Levels
Certificate Generation
Real-time Multiplayer Quiz
Email Notifications
Dark Mode
AI-generated Questions
💡 Learning Outcomes

Through this project, I learned:

MERN Stack Development
REST API Integration
MongoDB Database Handling
Authentication & Authorization
State Management in React
Full Stack Project Deployment
👨‍💻 Author

Sai Koushik

Final Year Student | Full Stack Developer