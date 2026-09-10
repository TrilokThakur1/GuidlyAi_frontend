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
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to <span className="text-indigo-600">The Guidly</span>
        </h2>

        <Tabs>
          {/* Tabs */}
          <TabList className="flex mb-6 rounded-lg overflow-hidden border">
            <Tab
              className="w-1/2 text-center py-2 cursor-pointer font-medium text-gray-600 focus:outline-none"
              selectedClassName="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
              Sign In
            </Tab>

            <Tab
              className="w-1/2 text-center py-2 cursor-pointer font-medium text-gray-600 focus:outline-none"
              selectedClassName="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
              Sign Up
            </Tab>
          </TabList>

          {/* Sign In */}
          <TabPanel>
            <form onSubmit={handleSignIn} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">
                Sign In
              </button>
            </form>
          </TabPanel>

          {/* Sign Up */}
          <TabPanel>
            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="file"
                placeholder="Avatar URL"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">
                Sign Up
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
