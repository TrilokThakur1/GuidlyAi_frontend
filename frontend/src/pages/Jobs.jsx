import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  ChevronRight,
  Star,
  Globe,
  Building2,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechFlow Systems",
      location: "Remote / Bengaluru",
      salary: "₹24L - ₹36L",
      type: "Full-time",
      posted: "2 days ago",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=TF&backgroundColor=4f46e5",
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Creative Labs",
      location: "Mumbai, India",
      salary: "₹18L - ₹28L",
      type: "Contract",
      posted: "5 hours ago",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CL&backgroundColor=ec4899",
      tags: ["Figma", "UI/UX", "Animation"],
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "DataSync Inc",
      location: "Hyderabad / Remote",
      salary: "₹20L - ₹32L",
      type: "Full-time",
      posted: "1 day ago",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=DS&backgroundColor=8b5cf6",
      tags: ["MERN", "AWS", "Next.js"],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Search & Header Section */}
      <section className="bg-white border-b border-slate-100 pt-12 pb-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
              Find Your Next <span className="text-indigo-600">Greatness</span>
            </h1>
            <p className="text-lg text-slate-600">
              Discover opportunities that align with your career roadmap and
              professional aspirations.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative group w-full lg:w-72">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <MapPin size={24} />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
              />
            </div>
            <button className="px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block w-72 space-y-8">
            <FilterSection title="Job Type">
              <FilterOption label="Full-time" count="124" checked />
              <FilterOption label="Contract" count="45" />
              <FilterOption label="Remote" count="89" />
            </FilterSection>

            <FilterSection title="Experience Level">
              <FilterOption label="Entry Level" count="32" />
              <FilterOption label="Mid-Senior" count="156" checked />
              <FilterOption label="Director" count="12" />
            </FilterSection>

            <FilterSection title="Salary Range">
              <FilterOption label="₹5L - ₹15L" count="43" />
              <FilterOption label="₹15L - ₹30L" count="21" />
              <FilterOption label="₹30L+" count="10" />
            </FilterSection>
          </aside>

          {/* Jobs List */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">
                Showing {jobs.length} relevant opportunities
              </h2>
              <button
                onClick={toggleFilters}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>

            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}

            <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition">
              Load More Opportunities
            </button>
          </main>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={toggleFilters}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Filters</h2>
              <button
                onClick={toggleFilters}
                className="p-2 text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-120px)]">
              <FilterSection title="Job Type">
                <FilterOption label="Full-time" count="124" checked />
                <FilterOption label="Contract" count="45" />
                <FilterOption label="Remote" count="89" />
              </FilterSection>
              <FilterSection title="Experience Level">
                <FilterOption label="Entry Level" count="32" />
                <FilterOption label="Mid-Senior" count="156" checked />
              </FilterSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterOption({ label, count, checked = false }) {
  return (
    <label className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500"
          readOnly
        />
        <span className="text-slate-600 font-medium group-hover:text-indigo-600 transition-colors">
          {label}
        </span>
      </div>
      <span className="text-slate-400 text-xs font-bold">{count}</span>
    </label>
  );
}

function JobCard({ job }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition group relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Company Logo */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-2xl shrink-0 flex items-center justify-center p-1 border border-slate-50">
          <img
            src={job.logo}
            alt={job.company}
            className="rounded-xl w-full h-full object-cover"
          />
        </div>

        {/* Job Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-slate-700">{job.company}</span>
                <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  4.8
                </span>
              </div>
            </div>
            <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold self-start">
              {job.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-1.5 leading-none">
              <MapPin size={16} className="text-slate-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <DollarSign size={16} className="text-slate-400" />
              {job.salary}
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <Clock size={16} className="text-slate-400" />
              {job.posted}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col justify-end md:justify-center">
          <button className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
            View Details
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
