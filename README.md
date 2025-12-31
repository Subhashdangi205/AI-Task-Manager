# 🚀 AI-Powered Task Agent (Full Stack)

This is a modern Task Management application that uses an **AI Agent** to help users organize and execute their tasks more efficiently. Built with **React** and **Django Rest Framework**.

## 🧠 AI Agent Capabilities
Unlike a normal Todo list, this app features an **Integrated AI Agent**:
* **Smart Analysis**: The Agent reads your task title and understands the context.
* **Actionable Insights**: Instead of just storing tasks, the Agent provides technical tips and execution plans.
* **Proactive Help**: Users can trigger the Agent using the "AI Insights" button to get immediate guidance on complex tasks.

## ✨ Key Features
* **Secure Authentication**: User accounts protected by JWT (Login/Register).
* **Full CRUD**: Create, Read, Update, and Delete tasks seamlessly.
* **Task Filtering**: Organise tasks by 'All', 'Pending', or 'Completed' status.
* **Real-time Feedback**: UI updates instantly when tasks are modified or deleted.
* **Responsive Dark UI**: Professional interface built with Tailwind CSS.

## 🛠️ Tech Stack
* **Frontend**: React.js (Vite), Tailwind CSS, Axios.
* **Backend**: Django, Django Rest Framework (DRF), SimpleJWT.
* **AI Engine**: Python-based logic for processing AI Suggestions.
* **Database**: SQLite (Default).

---

## 🚀 Installation & Setup

### 1. Backend (Django)
1. Navigate to `backend` folder.
2. Create virtual environment: `python -m venv venv`.
3. Activate: `venv\Scripts\activate` (Windows).
4. Install dependencies: `pip install -r requirements.txt`.
5. Run migrations: `python manage.py migrate`.
6. Start: `python manage.py runserver`.

### 2. Frontend (React)
1. Navigate to `frontend` folder.
2. Install packages: `npm install`.
3. Run app: `npm run dev`.

---

## 🔑 Environment Variables
Create a `.env` file in the `backend` folder and add:
- `AI_API_KEY`: Your Google Gemini or OpenAI API Key.

---
**Project Structure**:
- `/backend`: Django API & AI Engine logic.
- `/frontend`: React UI & State management.

Note: The project is currently using SQLite3 for zero-setup local evaluation. However, the architecture is compatible with MongoDB/MySQL by updating the database engine in settings.py.