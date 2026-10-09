import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserData";
import { Menu, X, Compass, User } from "lucide-react";
import axios from "axios";

export default function NavBar() {
  const { token } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getUserData() {
      try {
        if (!token?.access_token) return;

        const res = await axios.get(`${api}/api/auth/userDetails`, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        
        setUser({
          name: res.data.data.name,
          avatar: res.data.data.avatar,
        });
      } catch (err) {
        console.error("Failed to load navbar user data:", err);
      }
    }

    getUserData();
  }, [token, api]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "News", path: "/news" },
    { name: "Jobs", path: "/jobs" },
  ];

  return (
    <nav className="w-full bg-black/20 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div id="LogoSection" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
              <Compass size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              <Link to="/" className="hover:text-indigo-400 transition">
                GuidlyAi
              </Link>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-white/70 hover:text-white font-medium transition duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {token?.access_token ? (
              <li>
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 text-white rounded-full hover:bg-white/20 hover:text-indigo-400 transition border border-white/20 shadow-sm overflow-hidden"
                  title="Your Profile"
                >
                  {user ? (
                    <img
                      src={
                        user.avatar
                          ? user.avatar.startsWith("http")
                            ? user.avatar
                            : `${api}${user.avatar}`
                          : `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(user.name || "User")}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(user.name || "User")}`;
                      }}
                    />
                  ) : (
                    <User size={20} />
                  )}
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/auth"
                  className="px-5 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-white/70 hover:text-white font-medium py-2"
              >
                {link.name}
              </Link>
            ))}
            {token?.access_token ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block text-center px-5 py-2.5 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block text-center px-5 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
