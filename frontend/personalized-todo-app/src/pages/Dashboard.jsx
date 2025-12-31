import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import API from '../services/api'; 

export default function Dashboard() {
  const [tasks, setTasks] = useState([]); 
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [aiTip, setAiTip] = useState(null); 
  const [isAiLoading, setIsAiLoading] = useState(false);

  // --- Fetch Tasks ---
  const fetchTasks = async () => {
    try {
      const res = await API.get('tasks/');
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
  const toggleComplete = async (task) => {
    try {
      // Backend mein PATCH request bhej rahe hain status change karne ke liye
      await API.patch(`tasks/${task.id}/`, { completed: !task.completed });
      fetchTasks(); // List refresh karo naye data ke liye
    } catch (err) {
      alert("Could not update task status.");
    }
  };

  // --- Handle AI Suggestion ---
  const getAiSuggestion = async (title) => {
    setIsAiLoading(true);
    setAiTip(null);
    try {
      const res = await API.post('ai/suggest/', { title });
      setAiTip({ title, suggestion: res.data.suggestion });
    } catch (err) {
      alert("Failed to get AI suggestion. Please check your API key.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- Delete Task ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`tasks/${id}/`);
        setTasks(tasks.filter(t => t.id !== id));
      } catch (err) {
        alert("Failed to delete the task.");
      }
    }
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Task Dashboard</h1>
          <Link to="/add-task" className="bg-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            + Create New Task
          </Link>
        </div>

        {aiTip && (
          <div className="mb-8 p-4 bg-purple-900/30 border border-purple-500 rounded-xl animate-pulse">
            <h4 className="text-purple-400 font-bold text-sm mb-1">✨ AI Suggestion for "{aiTip.title}":</h4>
            <p className="text-gray-200">{aiTip.suggestion}</p>
          </div>
        )}

        <div className="mb-6 flex gap-4">
          {['all', 'pending', 'completed'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)} 
              className={`px-4 py-1 rounded-full text-sm capitalize transition ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading your tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No tasks found. Create one to get started!</div>
          ) : filteredTasks.map(task => (
            <div key={task.id} className="bg-gray-800 p-5 rounded-xl flex justify-between items-center border border-gray-700 hover:border-blue-500/50 transition">
              <div>
                <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                  {task.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{task.description}</p>
              </div>
              
              <div className="flex gap-3 items-center">
                <button 
                  onClick={() => getAiSuggestion(task.title)}
                  disabled={isAiLoading}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-[11px] px-3 py-1.5 rounded-lg font-bold transition disabled:opacity-50"
                >
                  {isAiLoading ? 'Analyzing...' : 'AI Insights ✨'}
                </button>

                {/* Complete/Undo Button */}
                <button 
                  onClick={() => toggleComplete(task)}
                  className={`px-2 py-1 rounded transition text-sm font-medium ${task.completed ? 'text-yellow-500 hover:bg-yellow-500/10' : 'text-green-500 hover:bg-green-500/10'}`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>

                <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:bg-red-500/10 px-2 py-1 rounded transition text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
