import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-extrabold text-white mb-4">GuidlyAi</h2>
            <p className="text-slate-400 mb-6 max-w-sm">
              Your ultimate platform for career growth. Discover roadmaps, industry news, and find your dream job.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Roadmaps</Link></li>
              <li><Link to="/news" className="hover:text-indigo-400 transition-colors">News</Link></li>
              <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Jobs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} GuidlyAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
