import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ReactMarkdown from "react-markdown";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [aiTip, setAiTip] = useState(null);
  const [aiLoadingId, setAiLoadingId] = useState(null);

  // 🔹 Edit states
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // --- Fetch Tasks ---
  const fetchTasks = async () => {
    try {
      const res = await API.get("tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //  Toggle Complete Function
  // --- Toggle Complete ---
  const toggleComplete = async (task) => {
    try {
      await API.patch(`tasks/${task.id}/`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      alert("Could not update task status");
    }
  };

  // --- AI Suggestion ---
  const getAiSuggestion = async (task) => {
    setAiLoadingId(task.id);
    setAiTip(null);

    try {
      const res = await API.post("ai/suggest/", {
        title: task.title,
        description: task.description || "",
      });

      setAiTip({
        title: task.title,
        suggestion: res.data.suggestion,
      });
    } catch (err) {
      alert("Failed to get AI suggestion");
    } finally {
      setAiLoadingId(null);
    }
  };

  // --- Delete Task ---
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`tasks/${id}/`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  // --- Open Edit ---
  const openEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // --- Save Edit ---
  const saveEdit = async () => {
    try {
      await API.patch(`tasks/${editingTask.id}/`, {
        title: editTitle,
        description: editDescription,
      });

      setEditingTask(null);
      fetchTasks();
    } catch {
      alert("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? task.completed
      : !task.completed
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">
            Dashboard
          </h1>
          <Link
            to="/add-task"
            className="bg-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            + New Task
          </Link>
        </div>

        {/* AI Output */}
        {aiTip && (
          <div className="mb-6 p-4 bg-purple-900/30 border border-purple-500 rounded-xl relative">
            <button
              onClick={() => setAiTip(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h4 className="text-purple-400 font-bold text-sm mb-1">
              Powered by Subhash Dangi 
            </h4>
            
            <p className="text-sm mb-2">
              Roadmap for <b>{aiTip.title}</b>
            </p>
           
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{aiTip.suggestion}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex gap-3">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm ${
                filter === f
                  ? "bg-blue-600"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 p-5 rounded-xl flex justify-between items-center mb-3"
            >
              <div>
                <h3
                  className={`text-lg font-bold ${
                    task.completed
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {task.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => getAiSuggestion(task)}
                  className="bg-purple-600 px-3 py-1 text-xs rounded"
                >
                  AI ✨
                </button>

                {/* Complete/Undo Button */}
                <button 
                
                  onClick={() => toggleComplete(task)}
                  className="text-green-400 text-sm"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => openEdit(task)}
                  className="text-blue-400 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {/* EDIT MODAL */}
        {editingTask && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Task</h2>

              <input
                className="w-full mb-3 p-2 rounded bg-gray-900"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />

              <textarea
                className="w-full mb-4 p-2 rounded bg-gray-900"
                rows="4"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="bg-blue-600 px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
