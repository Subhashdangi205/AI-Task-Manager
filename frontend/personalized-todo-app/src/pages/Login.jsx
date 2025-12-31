import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("LOGIN TRIGGERED");

    try {
      const res = await API.post("login/", { username, password });

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
        <h2 className="text-white text-3xl font-bold mb-2 text-center">Welcome Back</h2>

        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold">
          Login
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          No account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
}
