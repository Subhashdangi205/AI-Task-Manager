import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks/", {
        title: title,
        description: description,
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex items-center">
      <form
        onSubmit={handleAddTask}   
        className="max-w-lg mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-400">
          Create New Task
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 rounded-lg outline-none border border-transparent focus:border-blue-500"
            placeholder="e.g. Learn React Hooks"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none border border-transparent focus:border-blue-500 h-32"
            placeholder="Add some details..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg"
        >
          Add Task to List
        </button>
      </form>
    </div>
  );
}
