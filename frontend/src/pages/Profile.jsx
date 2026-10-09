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
  const { token, setToken } = useContext(UserContext);
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
        if (!token?.access_token) {
          navigate("/auth");
          return;
        }

        const res = await axios.get(`${api}/api/auth/userDetails`, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        // console.log(token)
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
    setToken({ access_token: null, refresh_token: null });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent w-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-white/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-6 w-full">
      <div className="max-w-4xl mx-auto space-y-8 text-white">
        {/* Simple Profile Info */}
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <img
            src={
              user.avatar
                ? user.avatar.startsWith("http")
                  ? user.avatar // already full URL
                  : `${api}${user.avatar}` // relative path → prepend API base
                : `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(user.name || "User")}` // fallback
            }
            alt="avatar"
            className="w-32 h-32 rounded-3xl border border-white/20 shadow-sm object-cover bg-white/5 p-2"
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(user.name || "User")}`;
            }}
          />
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-white/60 font-medium">
              <span className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} className="text-white/40" />
                {user.email}
              </span>
              <span className="flex items-center justify-center md:justify-start gap-2">
                <User size={18} className="text-white/40" />
                ID:{" "}
                <span className="text-white/40 font-mono text-xs">
                  {user.id}
                </span>
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/80 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-red-600 transition flex items-center gap-2 shrink-0 border border-red-500/50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Roadmap History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
              <Map className="text-indigo-400" />
              Your Roadmaps
            </h2>
            <Link
              to="/roadmap"
              className="text-indigo-400 font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Generate New <ChevronRight size={20} />
            </Link>
          </div>

          {roadmaps.length === 0 ? (
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-dashed border-white/20 p-12 text-center text-white/50 font-medium">
              No roadmaps found. Get started by generating your first path!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((item, i) => (
                <div
                  key={i}
                  className="bg-black/30 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10 hover:border-indigo-400/50 hover:bg-black/40 transition group"
                >
                  <div className="w-10 h-10 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/40 transition-colors">
                    <Navigation size={20} className="rotate-45" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-1 text-white">
                    {item.roadmapTitle || "Untitled Roadmap"}
                  </h3>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {item.roadmapDesc}
                  </p>
                  <Link
                    to="/roadmap"
                    state={{ roadmapData: item }}
                    className="inline-flex items-center gap-2 text-indigo-400 mt-4 font-bold text-sm group-hover:text-indigo-300"
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
