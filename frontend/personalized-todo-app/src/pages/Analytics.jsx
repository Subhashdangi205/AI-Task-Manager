import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("analytics/task-stats/");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-gray-400 flex items-center justify-center">Loading...</div>;
  if (!stats) return <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center">No Data</div>;

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [{
      data: [stats.completed_tasks, stats.pending_tasks],
      backgroundColor: ["#22c55e", "#ef4444"],
      borderWidth: 0,
    }],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-400">Analytics Dashboard</h1>
          {/* <Link to="/dashboard" className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600">← Back</Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total" value={stats.total_tasks} color="text-blue-400" />
          <StatCard title="Completed" value={stats.completed_tasks} color="text-green-400" />
          <StatCard title="Pending" value={stats.pending_tasks} color="text-red-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-300">Interactive Chart</h2>
            <div className="max-w-xs mx-auto">
              <Pie data={pieData} />
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-6 text-gray-300">Generated Report Image</h2>
            <img 
              src={`${stats.graph}?t=${new Date().getTime()}`} 
              className="mx-auto rounded-lg border border-gray-700" 
              alt="Task Analysis" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg text-center">
      <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">{title}</p>
      <p className={`text-4xl font-black mt-2 ${color}`}>{value}</p>
    </div>
  );
}