import React from "react";

import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import RoadMap from "./pages/RoadMap.jsx";
import News from "./pages/News.jsx";
import Jobs from "./pages/Jobs.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./components/Auth.jsx";

import UserData from "./context/UserData.jsx";

import {Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<RoadMap />} />
            <Route path="/news" element={<News />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
    </div>
  );
}
