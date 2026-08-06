import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMusic, FaBars, FaTimes, FaBell } from "react-icons/fa";
import NotificationDropdown from "../components/notifications/NotificationDropdown";
import { getNotifications } from "../services/notificationService";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log("Token in Navbar:", token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpen(false);
    navigate("/login");
  };



  useEffect(() => {
    const handleClickOutside = (event) => {

      // Profile dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      // Notification dropdown
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

    };


    const unreadCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data.notifications || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingNotifications(false);
      }
    };

    if (token) {
      loadNotifications();
    }
  }, [token]);



  return (


    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
          onClick={() => setOpen(false)}
        >
          <FaMusic className="text-orange-500 text-3xl" />
          <span>Guitar In Soul</span>
        </Link>


        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link to="/" className="hover:text-orange-500 transition">
            Home
          </Link>

          <Link to="/arrangements" className="hover:text-orange-500 transition">
            Arrangements
          </Link>

          <Link to="/upload" className="hover:text-orange-500 transition">
            Upload
          </Link>

          <Link to="/search" className="hover:text-orange-500 transition">
            Search
          </Link>

          <Link to="/request-song">
            Request Song
          </Link>

          <Link to="/requested-songs">
            Song Requests
          </Link>


          {/* Authentication Buttons */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-orange-500 text-orange-500 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">

              {/* Notification */}
              <div
                className="relative"
                ref={notificationRef}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationOpen(!notificationOpen);
                  }}
                  className="relative flex items-center justify-center w-11 h-11 rounded-full border border-orange-500/20 bg-white hover:bg-orange-50 transition-all duration-300"
                >
                  <FaBell className="text-xl text-orange-500" />

                  {notifications.length > 0 && (
                    <>
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>

                      <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {notifications.length > 99 ? "99+" : notifications.length}
                      </span>
                    </>
                  )}
                </button>

                <NotificationDropdown
                  notifications={notifications}
                  setNotifications={setNotifications}
                  loading={loadingNotifications}
                  isOpen={notificationOpen}
                />
              </div>

              {/* Profile */}






              <div
                className="relative"
                ref={dropdownRef}
              >

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={
                      user?.profileImage?.url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}&background=f97316&color=fff`
                    }
                    alt="profile"
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-500 hover:scale-105 transition"
                  />
                </button>


                {profileOpen && (
                  <div className="absolute right-0 mt-5 w-80 overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-900/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>

                    {/* Header */}
                    <div className="relative h-32 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black">

                      {/* Decorative Circle */}
                      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>

                      {/* Avatar */}
                      <div className="absolute left-1/2 -bottom-10 -translate-x-1/2">
                        <img
                          src={
                            user?.profileImage?.url ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.name || "User"
                            )}&background=111111&color=ffffff`
                          }
                          alt=""
                          className="w-20 h-20 rounded-full border-4 border-zinc-800 object-cover shadow-2xl"
                        />
                      </div>

                    </div>

                    {/* User Info */}
                    <div className="pt-14 pb-6 px-6 text-center">

                      <h2 className="text-xl font-bold text-white tracking-wide">
                        {user?.name}
                      </h2>

                      <p className="text-sm text-zinc-400 mt-1 truncate">
                        {user?.email}
                      </p>

                      <span className="inline-flex items-center mt-4 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1 text-xs font-medium text-zinc-300">
                        🎸 Guitar Enthusiast
                      </span>

                    </div>

                    {/* Menu */}

                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="group flex items-center gap-4 px-6 py-4 text-zinc-300 hover:bg-white/5 hover:text-white transition-all duration-200"
                      >
                        <span className="text-lg">🛠️</span>
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    )}
                    <div className="border-t border-zinc-800">

                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="group flex items-center gap-4 px-6 py-4 text-zinc-300 hover:bg-white/5 hover:text-white transition-all duration-200"
                      >
                        <span className="text-lg group-hover:scale-110 transition">👤</span>
                        <span className="font-medium">My Profile</span>
                      </Link>



                      <Link
                        to="/favorites"
                        onClick={() => setProfileOpen(false)}
                        className="group flex items-center gap-4 px-6 py-4 text-zinc-300 hover:bg-white/5 hover:text-white transition-all duration-200"
                      >
                        <span className="text-lg group-hover:scale-110 transition">❤️</span>
                        <span className="font-medium">Favorites</span>
                      </Link>



                    </div>

                    {/* Footer */}
                    <div className="border-t border-zinc-800 p-5">

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                        className="w-full rounded-xl border border-red-500 bg-red-600/10 py-3 font-semibold text-red-400 transition-all duration-300 hover:bg-red-600 hover:text-white"
                      >
                        Logout
                      </button>

                    </div>

                  </div>
                )}

              </div>
            </div>
          )}

        </nav>




        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </div>



      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-screen border-t border-gray-200" : "max-h-0"
          }`}
      >

        <nav className="flex flex-col bg-white">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500"
          >
            Home
          </Link>


          <Link
            to="/arrangements"
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500"
          >
            Arrangements
          </Link>


          <Link
            to="/upload"
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500"
          >
            Upload
          </Link>


          <Link
            to="/search"
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500"
          >
            Search
          </Link>


          <Link
            to="/request-song"
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500 transition"
          >
            Request a Song
          </Link>

          <Link
            to="/requested-songs"
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500 transition"
          >
            Song Requests
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="px-6 py-4 hover:bg-orange-50"
            >
              🛠️ Admin Dashboard
            </Link>
          )}



          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="m-4 bg-orange-500 text-white text-center py-3 rounded-full"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mx-4 mb-4 border border-orange-500 text-orange-500 text-center py-3 rounded-full"
              >
                Signup
              </Link>
            </>
          ) : (


            <div className="flex flex-col">

              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="px-6 py-4 hover:bg-orange-50 hover:text-orange-500 flex items-center justify-between"
              >
                <span>🔔 Notifications</span>

                {notifications.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.length > 99 ? "99+" : notifications.length}
                  </span>
                )}
              </Link>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="px-6 py-4 hover:bg-orange-50"
              >
                👤 My Profile
              </Link>
              <Link
                to="/favorites"
                onClick={() => setProfileOpen(false)}
                className="group flex items-center gap-4 px-6 py-4 hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                <span className="text-lg group-hover:scale-110 transition">❤️</span>
                <span className="font-medium">Favorites</span>
              </Link>

              <button
                onClick={handleLogout}
                className="m-4 bg-red-500 text-white py-3 rounded-full"
              >
                Logout
              </button>

            </div>
          )}


        </nav>

      </div>

    </header>
  );
};

export default Navbar;