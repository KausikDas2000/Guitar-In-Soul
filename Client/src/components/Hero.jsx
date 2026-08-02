import { Link } from "react-router-dom";
import GiS from "../assets/GiS.png"
import { FaMusic, FaGuitar, FaCloudUploadAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#F9F5EF]">

      {/* Left Dark Gradient */}
      <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black via-[#1a120b] to-transparent"></div>

      {/* Large Golden Glow */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-yellow-400/25 blur-[180px]"></div>

      {/* Small Orange Glow */}
      <div className="absolute left-1/3 top-20 w-72 h-72 rounded-full bg-orange-400/20 blur-[120px]"></div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-orange-500/10 blur-[120px]"></div>

      {/* Decorative Circles */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full border border-orange-300/10"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full border border-orange-300/5"></div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">

        {/* Left */}
        <div>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold">
            <FaMusic />
            Share • Learn • Inspire
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-white">
            Play
            <span className="text-orange-500"> Guitar</span>
            <br />
            From The
            <span className="block">Soul.</span>
          </h1>

          <p className="mt-8 text-gray-300 text-lg leading-8 max-w-xl">
            Discover thousands of guitar tabs, upload your own arrangements,
            and become part of a growing community of passionate musicians.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <Link
              to="/search"
              className="px-8 py-4 rounded-xl bg-white text-black hover:bg-orange-500 hover:text-white transition duration-300 shadow-xl"
            >
              Explore Songs
            </Link>

            <Link
              to="/upload"
              className="px-8 py-4 rounded-xl border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition duration-300"
            >
              Upload PDF
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 text-white">
            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-gray-400">Tabs Shared</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">2K+</h3>
              <p className="text-gray-400">Musicians</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-400">Uploads</p>
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="relative flex justify-center">

          {/* Image Glow */}
          <div className="absolute w-[90%] h-[90%] rounded-full bg-orange-500/30 blur-[120px]"></div>

          <div className="relative w-full max-w-[850px] h-[280px] sm:h-[380px] lg:h-[500px]">
            <img
              src={GiS}
              alt="Hero"
              className="w-full h-full object-contain lg:object-cover rounded-[35px]"
            />
          </div>


        

        </div>

      </div>
    </section>
  );
};

export default Hero;