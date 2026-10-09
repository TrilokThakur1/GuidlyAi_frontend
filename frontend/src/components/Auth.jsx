import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { UserContext } from "../context/UserData";

export default function Auth() {
  const api = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  let { token } = useContext(UserContext);

  useEffect(() => {
    if (token.access_token != null) {
      navigate("/profile");
    }
  }, [navigate, token]);

  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

 async function handleSignIn(e) {
  e.preventDefault();

  let data = {
    email: e.target[0].value,
    password: e.target[1].value,
  };

  let res = await axios.post(`${api}/api/auth/login`, data);

  if (res.status == 200) {
    const { access_token, refresh_token } = res.data; // <-- changed from res.data.data

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    navigate("/profile");
    success(res.data.message);
  } else {
    error(res.data.message);
  }
}

async function handleSignUp(e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", e.target[0].value);
  formData.append("avatar", e.target[1].files[0]);
  formData.append("email", e.target[2].value);
  formData.append("password", e.target[3].value);

  try {
    const res = await axios.post(`${api}/api/auth/register`, formData);

    const { access_token, refresh_token } = res.data; // <-- changed from res.data.data

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    success(res.data.message);
    navigate("/profile");
  } catch (err) {
    console.log(err.response?.data);
    error(err.response?.data?.message || "Registration failed");
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-24">
      <div className="w-full max-w-md bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome to <span className="text-indigo-400">GuidlyAi</span>
        </h2>

        <Tabs>
          {/* Tabs */}
          <TabList className="flex mb-8 bg-white/5 p-1 rounded-xl border border-white/10">
            <Tab
              className="w-1/2 text-center py-2.5 rounded-lg cursor-pointer font-bold text-white/60 hover:text-white transition-all focus:outline-none"
              selectedClassName="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
            >
              Sign In
            </Tab>

            <Tab
              className="w-1/2 text-center py-2.5 rounded-lg cursor-pointer font-bold text-white/60 hover:text-white transition-all focus:outline-none"
              selectedClassName="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
            >
              Sign Up
            </Tab>
          </TabList>

          {/* Sign In */}
          <TabPanel>
            <form onSubmit={handleSignIn} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
              <button className="w-full py-3.5 mt-2 text-white font-bold rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all transform active:scale-95">
                Sign In
              </button>
            </form>
          </TabPanel>

          {/* Sign Up */}
          <TabPanel>
            <form onSubmit={handleSignUp} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
              <div className="relative">
                <input
                  type="file"
                  id="avatarUpload"
                  className="hidden"
                />
                <label 
                  htmlFor="avatarUpload"
                  className="w-full flex items-center justify-center px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 cursor-pointer border-dashed transition-all font-medium"
                >
                  <span className="mr-2">📸</span> Upload Profile Photo
                </label>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
              <button className="w-full py-3.5 mt-2 text-white font-bold rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all transform active:scale-95">
                Create Account
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
