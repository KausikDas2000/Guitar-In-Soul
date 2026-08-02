import Navbar from "../components/Navbar";
import {
  FaCookieBite,
  FaShieldAlt,
  FaChartLine,
  FaGlobe,
  FaLock,
  FaCog,
} from "react-icons/fa";

const CookiePolicy = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0d0d0d] to-black text-white">

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-zinc-800">

          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/10 blur-[180px]" />

          <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-semibold">

              <FaCookieBite />

              Cookie Policy

            </div>

            <h1 className="text-5xl md:text-7xl font-black mt-8 leading-tight">

              Your Privacy
              <span className="block text-orange-500">
                Matters
              </span>

            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-zinc-400 text-lg leading-8">

              Guitar In Soul values your privacy. This page explains
              how cookies help us provide a better experience,
              improve performance, and deliver relevant content.

            </p>

            <p className="mt-6 text-sm text-zinc-500">
              Last Updated • August 2026
            </p>

          </div>

        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-xl hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaCookieBite />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              What are Cookies?
            </h2>

            <p className="text-zinc-400 leading-8">
              Cookies are small text files stored on your device that
              help websites remember information about your visit.
              They make browsing faster, more secure, and more
              personalized.
            </p>

          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-xl hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaShieldAlt />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Why We Use Cookies
            </h2>

            <ul className="space-y-4 text-zinc-400">

              <li>✔ Keep you logged in securely.</li>

              <li>✔ Remember your preferences.</li>

              <li>✔ Improve website performance.</li>

              <li>✔ Save your theme and settings.</li>

              <li>✔ Enable premium features.</li>

            </ul>

          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-xl hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaChartLine />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Analytics
            </h2>

            <p className="text-zinc-400 leading-8">

              We may use Google Analytics to understand how visitors
              interact with Guitar In Soul. This helps us improve
              features, performance, and user experience.

            </p>

          </div>

          {/* Card 4 */}
          <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-xl hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaGlobe />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Advertising Cookies
            </h2>

            <p className="text-zinc-400 leading-8">

              Google AdSense may use cookies to display relevant ads
              based on your interests. These cookies help improve the
              relevance of advertisements while supporting the platform.

            </p>

          </div>

          {/* Card 5 */}
          <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-xl hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaLock />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Your Privacy
            </h2>

            <p className="text-zinc-400 leading-8">

              We never sell your personal information. Cookies are used
              only to improve functionality, security, and your overall
              experience while using Guitar In Soul.

            </p>

          </div>

          {/* Card 6 */}
          <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-xl hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaCog />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Managing Cookies
            </h2>

            <p className="text-zinc-400 leading-8">

              You can disable or delete cookies anytime through your
              browser settings. Some features like login sessions,
              favorites, and preferences may not work properly if
              cookies are disabled.

            </p>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="max-w-5xl mx-auto px-6 pb-24">

          <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-zinc-900 to-zinc-900 p-10 text-center">

            <h2 className="text-4xl font-black mb-5">

              We Respect Your Privacy

            </h2>

            <p className="text-zinc-400 leading-8 max-w-3xl mx-auto">

              Guitar In Soul is committed to protecting your personal
              information while delivering the best experience for
              guitar players around the world.

            </p>

          </div>

        </div>

      </section>
    </>
  );
};

export default CookiePolicy;