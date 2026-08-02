import Navbar from "../components/Navbar";
import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaCookieBite,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0b0b0b] to-black text-white">

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-zinc-800">

          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/10 blur-[180px]" />

          <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">

            <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-orange-400 font-semibold">
              <FaUserShield />
              Privacy Policy
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
              Protecting
              <span className="block text-orange-500">
                Your Privacy
              </span>
            </h1>

            <p className="mt-8 max-w-3xl mx-auto text-zinc-400 text-lg leading-8">
              At Guitar In Soul, we value your trust. This Privacy Policy
              explains how we collect, use, and protect your personal
              information while you use our platform.
            </p>

            <p className="mt-6 text-sm text-zinc-500">
              Last Updated • August 2026
            </p>

          </div>

        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-8">

          {/* Card */}
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaDatabase />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Information We Collect
            </h2>

            <ul className="space-y-3 text-zinc-400 leading-8">
              <li>• Name</li>
              <li>• Email Address</li>
              <li>• Profile Picture</li>
              <li>• Uploaded Guitar Arrangements</li>
              <li>• Website Usage Information</li>
            </ul>

          </div>

          {/* Card */}
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaLock />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              How We Use Your Information
            </h2>

            <ul className="space-y-3 text-zinc-400 leading-8">
              <li>• Create and manage your account.</li>
              <li>• Allow uploading and sharing arrangements.</li>
              <li>• Improve platform performance.</li>
              <li>• Respond to your requests.</li>
              <li>• Keep the website secure.</li>
            </ul>

          </div>

          {/* Card */}
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaCookieBite />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Cookies
            </h2>

            <p className="text-zinc-400 leading-8">
              We use cookies to remember your login, improve performance,
              personalize your experience, and support analytics and
              advertising services.
            </p>

          </div>

          {/* Card */}
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaGlobe />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Third-Party Services
            </h2>

            <p className="text-zinc-400 leading-8">
              We may use trusted third-party services such as Cloudinary,
              Google Analytics, and Google AdSense. These providers have
              their own privacy practices and may process certain data to
              deliver their services.
            </p>

          </div>

          {/* Card */}
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaUserShield />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Your Rights
            </h2>

            <ul className="space-y-3 text-zinc-400 leading-8">
              <li>• Access your information.</li>
              <li>• Update your profile.</li>
              <li>• Delete your account (where supported).</li>
              <li>• Contact us with privacy concerns.</li>
            </ul>

          </div>

          {/* Card */}
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500 transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-3xl mb-6">
              <FaEnvelope />
            </div>

            <h2 className="text-3xl font-bold mb-5">
              Contact Us
            </h2>

            <p className="text-zinc-400 leading-8">
              If you have any questions regarding this Privacy Policy,
              please contact us through the Contact page or email us at
              <span className="text-orange-400 font-semibold">
                {" "}
                support@guitarinsoul.com
              </span>
            </p>

          </div>

        </div>

        {/* Bottom Banner */}

        <div className="max-w-5xl mx-auto px-6 pb-24">

          <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-zinc-900 to-zinc-900 p-10 text-center">

            <h2 className="text-4xl font-black mb-5">
              Your Trust Is Our Priority
            </h2>

            <p className="text-zinc-400 leading-8 max-w-3xl mx-auto">
              Guitar In Soul is committed to protecting your personal
              information and maintaining transparency about how your data
              is collected, stored, and used.
            </p>

          </div>

        </div>

      </section>
    </>
  );
};

export default PrivacyPolicy;