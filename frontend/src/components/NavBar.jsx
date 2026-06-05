import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserData";
import { Menu, X, Compass } from "lucide-react";

export default function NavBar() {
  const { token } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "News", path: "/news" },
    { name: "Jobs", path: "/jobs" },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div id="LogoSection" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Compass size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              <Link to="/" className="hover:text-indigo-600 transition">
                Guidly
              </Link>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-slate-600 hover:text-indigo-600 font-medium transition duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {token?.access_token ? (
              <li>
                <Link
                  to="/profile"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                >
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/auth"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
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
                className="block text-slate-600 hover:text-indigo-600 font-medium py-2"
              >
                {link.name}
              </Link>
            ))}
            {token?.access_token ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block text-center px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block text-center px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
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
