import React from "react";
import {
  ArrowRight,
  Compass,
  Rocket,
  Newspaper,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent w-full">
      {/* Hero Section */}
      <section className="relative min-h-[92svh] w-full md:min-h-[720px] flex items-center justify-center pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full text-center">
          <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight mb-6">
            Nothing here <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">stands still</span>
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            The ultimate platform for career growth. Discover curated
            roadmaps, stay updated with industry news, and find your dream
            job all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/roadmap"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition flex items-center justify-center gap-2 group"
            >
              Explore Roadmaps
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/auth"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-white/60 text-lg">
              Curated resources for every stage of your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Rocket className="text-indigo-400" size={32} />}
              title="Career Roadmaps"
              description="Step-by-step guides from beginner to expert in tech, design, and business."
              link="/roadmap"
            />
            <FeatureCard
              icon={<Newspaper className="text-indigo-400" size={32} />}
              title="Daily News"
              description="Stay informed with the latest trends and breakthroughs in your industry."
              link="/news"
            />
            <FeatureCard
              icon={<Briefcase className="text-indigo-400" size={32} />}
              title="Job Board"
              description="Find opportunities that match your specific roadmap and skill set."
              link="/jobs"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="bg-black/30 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10 hover:border-white/20 hover:bg-black/40 transition-all group"
    >
      <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-indigo-600/30 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </Link>
  );
}
