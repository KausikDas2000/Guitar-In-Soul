import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaChartPie,
  FaUsers,
  FaMusic,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaEnvelope,
  FaListAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-72
          bg-black border-r border-zinc-800
          flex flex-col z-50
          transform transition-transform duration-300
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-black text-orange-500">
              Guitar In Soul
            </h1>

            <p className="text-zinc-500 mt-1">
              Admin Panel
            </p>
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-3">

          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition"
          >
            <FaChartPie />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition"
          >
            <FaUsers />
            Users
          </Link>

          <Link
            to="/admin/arrangements"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition"
          >
            <FaMusic />
            Arrangements
          </Link>

          <Link
            to="/admin/messages"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition"
          >
            <FaEnvelope />
            Messages
          </Link>

          <Link
            to="/admin/requests"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition"
          >
            <FaListAlt />
            Song Requests
          </Link>

          <Link
            to="/admin/analytics"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition"
          >
            <FaChartLine />
            Analytics
          </Link>

        </nav>

        {/* Bottom Buttons */}
        <div className="p-5 border-t border-zinc-800 space-y-3">

          <button
            onClick={goHome}
            className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl py-3 font-semibold flex justify-center items-center gap-3 transition"
          >
            <FaHome />
            Home
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold flex justify-center items-center gap-3 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-zinc-800 bg-black flex items-center justify-between px-5 sticky top-0 z-30">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            <FaBars />
          </button>

          <h2 className="text-xl font-bold text-orange-500">
            Admin Panel
          </h2>

          <div className="w-6"></div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;