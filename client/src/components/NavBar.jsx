import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal"; // import modal

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, login, register, logout } = useAuth();

  const handleAuth = (type, data) => {
    if (type === "login") {
      login(data.email, data.password);
    } else {
      register(data.fullName, data.email, data.password);
    }
    setShowAuth(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-xl text-gray-900">
                SkillSwap
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="sm:hidden p-2 text-gray-700"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            {/* Navigation Links */}
            <div
              className={`${
                open ? "flex" : "hidden"
              } flex-col sm:flex sm:flex-row sm:items-center gap-4`}
            >
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>

              {/* Show Classes and Dashboard only if logged in */}
              {user && (
                <>
                  <Link
                    to="/classes"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Classes
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {/* Right-side buttons */}
              {!user ? (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuth={handleAuth}
      />
    </>
  );
}
