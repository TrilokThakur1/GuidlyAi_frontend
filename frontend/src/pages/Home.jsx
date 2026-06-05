import React from "react";
import {
  ArrowRight,
  Compass,
  Rocket,
  Newspaper,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Navigate Your <span className="text-indigo-600">Career</span>{" "}
                with Confidence.
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                The ultimate platform for career growth. Discover curated
                roadmaps, stay updated with industry news, and find your dream
                job all in one place.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  to="/roadmap"
                  className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 group"
                >
                  Explore Roadmaps
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/auth"
                  className="px-8 py-4 bg-slate-100 text-slate-900 rounded-full font-semibold hover:bg-slate-200 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute -top-24 -left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-24 -right-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <Compass size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Personalized Guidance
                    </h3>
                    <p className="text-sm text-slate-500">
                      Based on your goals
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-12 bg-slate-200 rounded-lg w-full animate-pulse"></div>
                  <div className="h-12 bg-slate-200 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-12 bg-slate-200 rounded-lg w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-slate-600 text-lg">
              Curated resources for every stage of your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Rocket className="text-indigo-600" size={32} />}
              title="Career Roadmaps"
              description="Step-by-step guides from beginner to expert in tech, design, and business."
              link="/roadmap"
            />
            <FeatureCard
              icon={<Newspaper className="text-indigo-600" size={32} />}
              title="Daily News"
              description="Stay informed with the latest trends and breakthroughs in your industry."
              link="/news"
            />
            <FeatureCard
              icon={<Briefcase className="text-indigo-600" size={32} />}
              title="Job Board"
              description="Find opportunities that match your specific roadmap and skill set."
              link="/jobs"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
    >
      <div className="mb-6 p-3 bg-indigo-50 rounded-xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </Link>
  );
}
