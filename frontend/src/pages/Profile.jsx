import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserData";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  LogOut,
  Map,
  ChevronRight,
  User,
  Mail,
  Navigation,
} from "lucide-react";

export default function Profile() {
  const api = import.meta.env.VITE_API_URL;
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch user data
  useEffect(() => {
    async function getUserData() {
      try {
        if (!token?.refresh_token) return;

        const res = await axios.get(`${api}/api/auth/userDetails`, {
          headers: {
            Authorization: `Bearer ${token.refresh_token}`,
          },
        });

        setUser({
          id: res.data.data.id,
          name: res.data.data.name,
          avatar: res.data.data.avatar,
          email: res.data.data.email,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [token]);

  //  Fetch roadmaps AFTER user is set
  useEffect(() => {
    async function getUserRoadMaps() {
      try {
        if (!user.id) return;

        const res = await axios.get(
          `${api}/api/roadmap/myPlans?userId=${user.id}`,
        );

        setRoadmaps(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    getUserRoadMaps();
  }, [user.id]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8 text-slate-900">
        {/* Simple Profile Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <img
            src={
              user.avatar
                ? user.avatar.startsWith("http")
                  ? user.avatar // already full URL
                  : `${api}${user.avatar}` // relative path → prepend API base
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff` // fallback
            }
            alt="avatar"
            className="w-32 h-32 rounded-3xl border-2 border-slate-100 shadow-sm object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`;
            }}
          />
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-500 font-medium">
              <span className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} className="text-slate-400" />
                {user.email}
              </span>
              <span className="flex items-center justify-center md:justify-start gap-2">
                <User size={18} className="text-slate-400" />
                ID:{" "}
                <span className="text-slate-400 font-mono text-xs">
                  {user.id}
                </span>
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2 shrink-0 shadow-lg shadow-slate-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Roadmap History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Map className="text-indigo-600" />
              Your Roadmaps
            </h2>
            <Link
              to="/roadmap"
              className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Generate New <ChevronRight size={20} />
            </Link>
          </div>

          {roadmaps.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-400 font-medium">
              No roadmaps found. Get started by generating your first path!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-indigo-100 transition group"
                >
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Navigation size={20} className="rotate-45" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">
                    {item.roadmapTitle || "Untitled Roadmap"}
                  </h3>

                  <p className="text-sm text-slate-500 line-clamp-2">
                    {item.roadmapDesc}
                  </p>
                  <Link
                    to="/roadmap"
                    className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm"
                  >
                    View Details <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
