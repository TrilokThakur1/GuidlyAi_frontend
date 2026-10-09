import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import RoadMap from "./pages/RoadMap.jsx";
import News from "./pages/News.jsx";
import Jobs from "./pages/Jobs.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./components/Auth.jsx";
import UserData from "./context/UserData.jsx";
import OrbitalHeroSection from "./components/ui/orbital-hero-section.tsx";

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="flex-1 w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen text-white relative">
      <div className="fixed inset-0 z-[-1]">
        <OrbitalHeroSection 
          focus={[0.5, 0.5]}
          scrim="none"
          viewRadius={3.5}
          glow={0.8}
        />
      </div>
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/roadmap" element={<AnimatedPage><RoadMap /></AnimatedPage>} />
          <Route path="/news" element={<AnimatedPage><News /></AnimatedPage>} />
          <Route path="/jobs" element={<AnimatedPage><Jobs /></AnimatedPage>} />
          <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
          <Route path="/auth" element={<AnimatedPage><Auth /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
