import React from 'react';
import { Link } from 'react-router-dom';

import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md text-white/70 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-4 w-fit">
              <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400 group-hover:bg-indigo-500/40 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300">
                <Compass size={22} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-100 transition-colors">
                Guidly<span className="text-indigo-400">Ai</span>
              </h2>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
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
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} GuidlyAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
