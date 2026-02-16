# 🚀 AI-Powered Smart Task Agent (Full Stack with Analytics)

A modern **AI-Driven Task Management System** that helps users organize, analyze, and execute tasks efficiently.
The application integrates an **AI Agent**, **JWT Authentication**, and a **Task Analytics Dashboard** with visual reports.

Built using **React, Django Rest Framework, and Supabase**.

---

# 🧠 AI Agent Capabilities

Unlike a traditional Todo application, this system includes an intelligent AI assistant:

* **Smart Context Understanding** — AI reads task titles and understands intent.
* **Actionable Roadmaps** — Provides execution steps and technical suggestions.
* **On-Demand Insights** — Users can trigger AI guidance instantly.
* **Productivity Enhancement** — Helps users complete tasks faster with structured plans.

---

# 📊 Analytics Dashboard (New Feature)

The system now includes a **User Analytics Module**:

* Total Tasks Overview
* Completed vs Pending Analysis
* Interactive Pie Charts
* Visual Report Generation
* Progress Monitoring per User
* Report Image Export / Print Support

This allows users to track productivity trends and performance visually.

---

# ✨ Key Features

## 🔐 Authentication & Security

* JWT-based Login & Registration
* Secure Protected Routes
* Token-based API Access

## ✅ Task Management

* Create, Update, Delete Tasks
* Task Status Toggle (Pending / Completed)
* Real-time UI Updates
* Task Filtering System

## 🤖 AI Integration

* AI Suggestions for Tasks
* Technical Guidance & Execution Plans
* Markdown Rendering Support

## 📈 Analytics & Reporting

* User Productivity Metrics
* Visual Charts & Reports
* Export / Print Reports
* Performance Insights

## 🎨 UI/UX

* Modern Dark Theme
* Responsive Layout
* Tailwind CSS Styling
* Professional Dashboard Design

---

# 🛠️ Tech Stack

## Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Chart.js / Recharts (for analytics)

## Backend

* Django
* Django Rest Framework (DRF)
* SimpleJWT Authentication

## Database & Cloud

* Supabase (PostgreSQL)
* SQLite (optional local development)

## AI Engine

* Python-based AI processing
* Gemini / OpenAI API Support

---

# 🚀 Installation & Setup

## 1️⃣ Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 2️⃣ Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create `.env` file inside backend folder:

```
AI_API_KEY=your_ai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SECRET_KEY=django_secret_key
```

---

# 📂 Project Structure

```
/backend
    /tasks
    /users
    /analytics
    /ai_engine
/frontend
    /components
    /pages
```

---

# 📌 Future Improvements

* Email Notifications
* Team Collaboration Tasks
* Deadline Reminder System
* Mobile App Version
* Advanced AI Planning Agent

---

# 👨‍💻 Author

**Subhash Dangi**

Full Stack Developer | AI Enthusiast

---

# ⭐ Highlights

This project demonstrates:

✔ Full Stack Development
✔ AI Integration
✔ Data Visualization
✔ Authentication Systems
✔ Cloud Database Usage
✔ Production-Ready Architecture

---

# 📜 License

This project is for educational and portfolio purposes.
