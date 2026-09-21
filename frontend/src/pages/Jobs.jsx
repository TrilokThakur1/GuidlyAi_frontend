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

const realCompanies = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "Uber", "Airbnb", "Spotify", "Stripe", "OpenAI", "Tesla", "Nvidia", "Adobe", "Salesforce", "Atlassian", "Slack", "GitHub", "Vercel", "Figma"];
const roles = [
  "Senior Frontend Engineer", "React Developer", "UI/UX Engineer", "Frontend Architect",
  "Backend Software Engineer", "Node.js Developer", "Python Backend Engineer", "Golang Developer",
  "Full Stack Developer", "MERN Stack Engineer", "Software Engineer - Fullstack",
  "Machine Learning Engineer", "AI Researcher", "Data Scientist", "NLP Engineer",
  "DevOps Engineer", "Site Reliability Engineer", "Cloud Architect",
  "iOS Developer", "Android Engineer", "React Native Developer",
  "Product Designer", "UX Researcher"
];
const locations = ["Remote", "Bengaluru", "San Francisco, CA", "New York, NY", "London, UK", "Seattle, WA", "Austin, TX", "Toronto, Canada", "Berlin, Germany", "Singapore"];
const tagsList = [["React", "TypeScript", "Tailwind"], ["Python", "Django", "PostgreSQL"], ["Node.js", "Express", "MongoDB"], ["Figma", "UI/UX", "Prototyping"], ["AWS", "Docker", "Kubernetes"], ["TensorFlow", "PyTorch", "Python"], ["Swift", "iOS", "Xcode"], ["Kotlin", "Android", "Java"], ["Vue.js", "Nuxt", "CSS"], ["Go", "Microservices", "gRPC"]];

const descriptions = [
  "We are looking for an experienced engineer to join our core team. You will be responsible for building highly scalable systems and delivering exceptional user experiences. The ideal candidate has a strong background in modern web technologies and a passion for solving complex problems.",
  "Join our fast-paced startup where you'll have a massive impact from day one. We are building the next generation of our product and need talented developers to help architect and implement new features. You'll work closely with product managers and designers in an agile environment.",
  "As a key member of our engineering team, you will design, develop, and maintain critical infrastructure. We value clean code, automated testing, and continuous deployment. If you love optimizing performance and working with distributed systems, this role is for you."
];

const generateJobs = () => {
  const generatedJobs = [];
  for (let i = 1; i <= 50; i++) {
    const title = roles[(i * 3) % roles.length];
    const company = realCompanies[(i * 7) % realCompanies.length];
    const location = locations[(i * 5) % locations.length];
    const tags = tagsList[(i * 2) % tagsList.length];
    const salary = `₹${15 + (i % 25)}L - ₹${30 + (i % 30)}L`;
    const type = i % 4 === 0 ? "Contract" : (i % 7 === 0 ? "Internship" : "Full-time");
    const desc = descriptions[i % descriptions.length];
    
    generatedJobs.push({
      id: i,
      title: title,
      company: company,
      location: location,
      salary: salary,
      type: type,
      posted: `${(i % 5) + 1} days ago`,
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${company.substring(0, 2)}&backgroundColor=${['4f46e5', 'ec4899', '8b5cf6', '10b981', 'f59e0b'][i % 5]}`,
      tags: tags,
      description: desc + "\n\nRequirements:\n- 3+ years of relevant experience\n- Strong problem-solving skills\n- Excellent communication abilities\n- Ability to work independently and as part of a team."
    });
  }
  return generatedJobs;
};

const initialJobs = generateJobs();

export default function Jobs() {
  const [jobs, setJobs] = useState(initialJobs);

  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Job Details Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Application Toast State
  const [showToast, setShowToast] = useState(false);
  
  // Search and Pagination States
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const toggleFilters = () => setShowFilters(!showFilters);

  // Trigger Search when button is clicked
  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
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
                Showing {filteredJobs.length} relevant opportunities
              </h2>
              <button
                onClick={toggleFilters}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>

            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <JobCard key={job.id} job={job} onViewDetails={() => setSelectedJob(job)} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-2">No jobs found</h3>
                <p className="text-slate-500">Try adjusting your search criteria.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-6">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <span className="font-bold text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
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

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedJob(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                  <img src={selectedJob.logo} alt={selectedJob.company} className="rounded-xl w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedJob.title}</h2>
                  <p className="text-lg text-slate-600 font-medium">{selectedJob.company}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedJob(null)} 
                className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-full transition shrink-0"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="flex flex-wrap gap-4 text-slate-600 text-sm font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-1.5"><MapPin size={18} className="text-slate-400" />{selectedJob.location}</div>
                <div className="flex items-center gap-1.5"><DollarSign size={18} className="text-slate-400" />{selectedJob.salary}</div>
                <div className="flex items-center gap-1.5"><Briefcase size={18} className="text-slate-400" />{selectedJob.type}</div>
                <div className="flex items-center gap-1.5"><Clock size={18} className="text-slate-400" />Posted {selectedJob.posted}</div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">About the Role</h3>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Required Skills & Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white rounded-b-3xl flex flex-col sm:flex-row justify-end gap-3 shrink-0">
              <button 
                onClick={() => setSelectedJob(null)} 
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowToast(true);
                  setTimeout(() => {
                    setShowToast(false);
                    setSelectedJob(null);
                  }, 2500);
                }}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 lg:bottom-12 lg:right-12 z-[150] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <p className="font-bold text-white text-base">Application Submitted!</p>
            <p className="text-slate-400 text-sm font-medium">The company will review your profile.</p>
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

function JobCard({ job, onViewDetails }) {
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
          <button 
            onClick={onViewDetails}
            className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            View Details
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
