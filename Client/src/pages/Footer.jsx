import { Link, NavLink } from "react-router-dom";
import {
  FaGuitar,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 ">

      {/* Top Section */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">

                <FaGuitar className="text-white text-2xl" />

              </div>

              <div>

                <h2 className="text-2xl font-black text-white">
                  Guitar In Soul
                </h2>

                <p className="text-orange-400 text-sm">
                  Community Library
                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-gray-400">
              Discover thousands of guitar arrangements,
              notation PDFs, tabs, backing tracks and audio
              shared by passionate musicians around the world.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="https://www.facebook.com/Kausikofficiall"
                className="w-11 h-11 rounded-xl bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/kausik_03/"
                className="w-11 h-11 rounded-xl bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/@GuitarInSoul"
                className="w-11 h-11 rounded-xl bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaYoutube />
              </a>

              <a
                href="https://github.com/KausikDas2000"
                className="w-11 h-11 rounded-xl bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaGithub />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-xl font-bold mb-6">
              Explore
            </h3>

            <div className="flex flex-col gap-4">

              <Link className="hover:text-orange-400 transition" to="/">
                Home
              </Link>

              <Link className="hover:text-orange-400 transition" to="/arrangements">
                Arrangements
              </Link>

              <Link className="hover:text-orange-400 transition" to="/upload">
                Upload
              </Link>

              <Link className="hover:text-orange-400 transition" to="/about">
                About
              </Link>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-8 py-4 rounded-full border font-semibold transition ${isActive
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-white/30 hover:bg-white hover:text-black text-gray-300"
                  }`
                }
              >
                Contact
              </NavLink>

            </div>

          </div>

          {/* Community */}

          <div>

            <h3 className="text-white text-xl font-bold mb-6">
              Community
            </h3>

            <div className="flex flex-col gap-4">

              <Link className="hover:text-orange-400 transition" to="#">
                Top Arrangements
              </Link>

              <Link className="hover:text-orange-400 transition" to="#">
                New Uploads
              </Link>

              <Link className="hover:text-orange-400 transition" to="#">
                Guitar Lessons
              </Link>

              <Link className="hover:text-orange-400 transition" to="#">
                FAQ
              </Link>

              <Link
                to="/privacy-policy"
                className="hover:text-orange-500 transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-orange-500"
              >
                Cookie Policy
              </Link>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-white text-xl font-bold mb-6">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-6 leading-7">
              Get notified whenever new arrangements are uploaded.
            </p>

            <div className="flex">

              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 rounded-l-xl bg-gray-800 border border-gray-700 px-4 py-3 outline-none focus:border-orange-500"
              />

              <button className="px-5 rounded-r-xl bg-orange-500 hover:bg-orange-600 transition">

                <FaArrowRight className="text-white" />

              </button>

            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">

              <div>

                <h4 className="text-2xl font-bold text-white">
                  5K+
                </h4>

                <p className="text-sm text-gray-500">
                  Songs
                </p>

              </div>

              <div>

                <h4 className="text-2xl font-bold text-white">
                  2K+
                </h4>

                <p className="text-sm text-gray-500">
                  Members
                </p>

              </div>

              <div>

                <h4 className="text-2xl font-bold text-white">
                  12
                </h4>

                <p className="text-sm text-gray-500">
                  Genres
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Guitar In Soul.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <Link to="#" className="hover:text-orange-400">
              Terms
            </Link>

            <Link to="#" className="hover:text-orange-400">
              Privacy
            </Link>

            <Link to="#" className="hover:text-orange-400">
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;