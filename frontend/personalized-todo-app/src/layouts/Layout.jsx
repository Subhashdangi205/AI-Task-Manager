import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    window.location.href = "/"; 
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar ya Navbar yahan aayega */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-500 mb-8">AI Todo</h2>
        <nav className="flex-1 space-y-4">
          <Link to="/dashboard" className="block p-3 hover:bg-gray-700 rounded-lg">Dashboard</Link>
          <Link to="/add-task" className="block p-3 hover:bg-gray-700 rounded-lg">Add Task</Link>
        </nav>
        <button onClick={handleLogout} className="bg-red-600/20 text-red-500 p-2 rounded-lg hover:bg-red-600 hover:text-white transition">
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Outlet hi Dashboard ko render karega */}
        <Outlet /> 
      </main>
    </div>
  );
}