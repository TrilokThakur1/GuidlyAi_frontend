import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserData";
import {
  Search,
  Loader2,
  Map,
  BookOpen,
  Video,
  Info,
  CheckCircle2,
  Navigation,
} from "lucide-react";

let api = import.meta.env.VITE_API_URL;

export default function RoadMap() {
  const { token } = useContext(UserContext);
  const location = useLocation();

  const [roadmap, setRoadmap] = useState(location.state?.roadmapData || null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  /* =======================
     GET LOGGED-IN USER
  ======================= */
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
          email: res.data.data.email,
          avatar: res.data.data.avatar,
        });
      } catch (err) {
        console.error("Failed to load user", err);
      }
    }

    getUserData();
  }, [token]);

  /* =======================
     GENERATE ROADMAP
  ======================= */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = e.target.roadmap.value;

      const res = await axios.post(`${api}/api/roadmap/plan`, {
        prompt,
        userId: user.id,
      });

      setRoadmap(res.data.data);
    } catch (err) {
      console.error("Failed to generate roadmap", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-100 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
              Your Professional <span className="text-indigo-600">Roadmap</span>
            </h1>
            <p className="text-lg text-slate-600">
              Enter your career goal or a skill you want to master, and our AI
              will generate a step-by-step path for you.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Search size={24} />
              </div>
              <input
                type="text"
                id="roadmap"
                name="roadmap"
                required
                placeholder="e.g. Senior Frontend Developer, Data Science, MERN"
                className="w-full pl-14 pr-36 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-2.5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Navigation size={20} className="rotate-45" />
                )}
                Generate
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Output Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
              <Loader2 className="animate-spin" size={32} />
            </div>
            <p className="text-lg font-medium text-slate-600">
              Mapping out your future...
            </p>
          </div>
        )}

        {roadmap && !loading && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            {/* Summary Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-slate-100 -mr-8 -mt-8">
                <Map size={120} />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-4">
                  <CheckCircle2 size={16} />
                  Strategy Ready
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  {roadmap.roadmapTitle}
                </h2>
                <div className="text-xl font-medium text-slate-700 mb-4">
                  {roadmap.greetings}
                </div>
                <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-indigo-200 pl-4">
                  "{roadmap.roadmapDesc}"
                </p>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-indigo-600 before:via-purple-500 before:to-pink-500">
              {roadmap?.roadmapSteps?.map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-indigo-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
                    <span className="font-bold text-sm">{index + 1}</span>
                  </div>
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group-hover:border-indigo-200 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-slate-900 text-xl">
                        {step.stepTitle}
                      </h3>
                      <time className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md shrink-0">
                        {step.stepEstimatedTime}
                      </time>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.stepDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Resources Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {/* Books */}
              {roadmap?.resources?.books?.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <BookOpen size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Recommended Books
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {roadmap.resources.books.map((book, index) => (
                      <div key={index} className="group cursor-default">
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {book.bookTitle}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                          By {book.bookAuthor}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {book.bookDesc}
                        </p>
                        {index !== roadmap.resources.books.length - 1 && (
                          <div className="mt-6 border-b border-slate-50"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {roadmap?.resources?.videos?.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <Video size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Video Tutorials
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {roadmap.resources.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                      >
                        <div className="w-8 h-8 bg-white text-slate-400 group-hover:text-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                          <Play size={16} fill="currentColor" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-700 truncate">
                          {
                            video
                              .replace(/https?:\/\/(www\.)?/, "")
                              .split("/")[0]
                          }{" "}
                          Tutorial
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Last Words */}
            <div className="bg-indigo-600 p-8 rounded-3xl text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 -ml-16 -mt-16 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full blur-2xl"></div>
              <div className="relative">
                <Info className="mx-auto mb-4 opacity-50" size={32} />
                <p className="text-xl font-bold leading-relaxed">
                  {roadmap.lastWords}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Play({ size, fill, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
