import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('users/register/', formData);
      alert("Registration successful! Please login to continue.");
      navigate('/'); // Redirect to login page
    } catch (err) {
      alert("Registration failed. This username might already be taken.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <form onSubmit={handleRegister} className="p-8 bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-500">Create Account</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Join us to manage your tasks with AI</p>

        <div className="space-y-4">
          <input 
            className="w-full p-3 bg-gray-700 rounded-lg outline-none border border-transparent focus:border-blue-500 transition" 
            type="text" placeholder="Username" required
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
          />
          <input 
            className="w-full p-3 bg-gray-700 rounded-lg outline-none border border-transparent focus:border-blue-500 transition" 
            type="email" placeholder="Email Address" required
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            className="w-full p-3 bg-gray-700 rounded-lg outline-none border border-transparent focus:border-blue-500 transition" 
            type="password" placeholder="Password" required
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
        </div>

        {/* Main Action Button */}
        <button className="w-full bg-blue-600 mt-8 p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg active:scale-95">
          Sign Up
        </button>

        {/* Updated Login Option */}
        <div className="mt-6 text-center">
          <span className="text-gray-400 text-sm">Already have an account? </span>
          <Link to="/" className="text-blue-500 hover:text-blue-400 font-bold ml-1 transition">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}