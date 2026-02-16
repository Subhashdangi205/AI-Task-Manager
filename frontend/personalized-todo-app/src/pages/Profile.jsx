import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Profile() {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ user data login ke time localStorage me hona chahiye
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const backendBaseURL = "http://127.0.0.1:8000";

  // 🔹 PROFILE PIC FETCH
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("users/profile/");
        if (res.data.profile_pic) {
          setPreview(
            res.data.profile_pic.startsWith("http")
              ? res.data.profile_pic
              : backendBaseURL + res.data.profile_pic
          );
        }
      } catch (err) {
        console.error("Profile fetch error", err);
      }
    };
    fetchProfile();
  }, []);

  // 🔹 PROFILE PIC UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image");

    const data = new FormData();
    data.append("profile_pic", selectedFile);

    try {
      setLoading(true);
      await API.put("users/profile/", data);
      alert("Profile picture updated ✅");
    } catch (err) {
      console.error("Update error", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#111827] rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-blue-400 mb-6">
          Account Settings
        </h2>

        {/* USER INFO (READ ONLY) */}
        {/* <div className="grid grid-cols-2 gap-4 mb-8">
          <input
            value={username || ""}
            disabled
            className="bg-gray-800 px-4 py-3 rounded-lg text-gray-400"
          />
          <input
            value={email || ""}
            disabled
            className="bg-gray-800 px-4 py-3 rounded-lg text-gray-400"
          />
        </div> */}

        {/* PROFILE PIC */}
        <form onSubmit={handleUpdate}>
          <div className="flex items-center gap-6 mb-6">
            <img
              src={preview || "https://via.placeholder.com/120"}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500/40"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Update Profile Picture"}
          </button>
        </form>
      </div>
    </div>
  );
}
