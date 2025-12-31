import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};


  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/dashboard" className="text-xl font-bold text-blue-500">
          AI Smart Tasks
        </Link>

        {/* Links (Requirement 6) */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link to="/add-task" className="text-gray-300 hover:text-white transition">
            Add Task
          </Link>
          
          {/* Logout Button (Requirement 7) */}
          <button 
            onClick={handleLogout}
            className="bg-red-600/20 text-red-500 border border-red-500/50 px-4 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}