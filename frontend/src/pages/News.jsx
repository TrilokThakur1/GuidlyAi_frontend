import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Newspaper,
  Clock,
  User,
  ArrowUpRight,
  Loader2,
  RefreshCcw,
  Globe,
} from "lucide-react";

let apiKey = import.meta.env.VITE_API_KEY_NEWS;

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getNews() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/news/tech/`
      );

      setNews(response.data.articles);
      // setNews(res.data.articles || []);
    } catch (err) {
      console.error("Failed to fetch news", err);
      setError("Could not load news at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="min-h-screen bg-transparent w-full">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold mb-4">
              <Globe size={14} />
              Global Tech Pulse
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Explore the <span className="text-indigo-400">Future</span>.
            </h1>
            <p className="text-lg text-white/70 font-medium">
              Curated tech insights and industry breakthroughs from India and
              across the globe.
            </p>
          </div>
          <button
            onClick={getNews}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-2xl font-bold hover:bg-white/90 transition shadow-lg shadow-white/10 shrink-0"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            Refresh Feed
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white/5 backdrop-blur-md rounded-3xl h-[450px] border border-white/10"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <RefreshCcw size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-white/60 mb-6">{error}</p>
            <button
              onClick={getNews}
              className="text-indigo-400 font-bold hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div
            id="NewsContainer"
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function NewsCard({ article }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";

  return (
    <article className="bg-black/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 overflow-hidden flex flex-col group hover:shadow-2xl hover:border-indigo-400/50 hover:bg-black/40 transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={article.urlToImage || fallbackImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm border border-white/20">
            Tech Update
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-white/50 text-xs font-bold mb-4 uppercase tracking-wide">
          <span className="flex items-center gap-1">
            <User size={14} />
            {article.author?.split(",")[0].substring(0, 15) ||
              "Industry Expert"}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {new Date(article.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <h2 className="font-extrabold text-xl mb-4 line-clamp-2 text-white group-hover:text-indigo-400 transition-colors leading-tight">
          {article.title}
        </h2>

        <p className="text-white/60 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-indigo-400 font-bold hover:gap-3 transition-all text-sm group/link hover:text-indigo-300"
        >
          Read Full Insight
          <ArrowUpRight
            size={18}
            className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
          />
        </a>
      </div>
    </article>
  );
}
