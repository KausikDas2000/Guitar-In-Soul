import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCookieBite, FaShieldAlt } from "react-icons/fa";

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setTimeout(() => setShow(true), 800);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-5xl animate-[fadeIn_.4s_ease]">

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.65)]">

        {/* Glow */}
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl"></div>
        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-white/5 blur-3xl"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 p-8">

          {/* Left */}
          <div className="flex gap-6">

            <div className="hidden sm:flex h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center shadow-xl">
              <FaCookieBite className="text-white text-3xl" />
            </div>

            <div>

              <div className="flex items-center gap-2">

                <FaShieldAlt className="text-orange-400" />

                <h2 className="text-2xl font-black text-white">
                  Your Privacy Matters
                </h2>

              </div>

              <p className="mt-4 text-zinc-400 leading-7 max-w-2xl">

                Guitar In Soul uses cookies to keep you logged in,
                remember your preferences, improve performance,
                analyze traffic, and provide personalized content
                and advertisements.

              </p>

              <Link
                to="/cookie-policy"
                className="inline-flex items-center gap-2 mt-4 text-orange-400 font-semibold hover:text-orange-300 transition"
              >
                Learn more →
              </Link>

            </div>

          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={declineCookies}
              className="px-8 py-4 rounded-2xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Decline
            </button>

            <button
              onClick={acceptCookies}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-xl transition-all duration-300 hover:scale-105"
            >
              Accept Cookies
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CookieBanner;