import Navbar from "../components/Navbar";
import Footer from "./Footer";
import {
  FaMusic,
  FaGuitar,
  FaCloudUploadAlt,
  FaUsers,
  FaHeart,
  FaSearch,
} from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar />

      <section className="bg-zinc-950 text-white">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <span className="inline-block bg-orange-500/20 text-orange-400 px-5 py-2 rounded-full font-semibold">
            About Guitar In Soul
          </span>

          <h1 className="text-5xl md:text-6xl font-black mt-8 leading-tight">
            The Home of
            <span className="text-orange-500">
              {" "}Rare Guitar Arrangements
            </span>
          </h1>

          <p className="max-w-4xl mx-auto mt-8 text-zinc-400 text-lg leading-8">
            Guitar In Soul is built for guitar lovers who are passionate about
            discovering rare, hard-to-find, and soulful guitar arrangements.
            From timeless classics to modern masterpieces, our mission is to
            preserve unique musical interpretations that are often impossible to
            find anywhere else.
          </p>

        </div>

        {/* Story */}
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-black mb-6">
              Why Guitar In Soul?
            </h2>

            <p className="text-zinc-400 leading-8 mb-6">
              Every guitarist knows the frustration of searching endlessly for a
              particular arrangement or fingerstyle notation that simply doesn't
              exist on popular platforms.
            </p>

            <p className="text-zinc-400 leading-8 mb-6">
              Guitar In Soul was created to solve this problem by bringing
              together musicians from around the world who are willing to share
              their unique arrangements with the community.
            </p>

            <p className="text-zinc-400 leading-8">
              Whether you're learning your favorite movie soundtrack, anime
              opening, worship song, classical masterpiece, or an underrated
              indie composition, our goal is to help you find the arrangement
              you've been searching for.
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800">

            <h3 className="text-2xl font-bold mb-8">
              What You'll Discover
            </h3>

            <div className="space-y-8">

              <div className="flex gap-5">
                <FaSearch className="text-orange-500 text-3xl mt-1" />
                <div>
                  <h4 className="font-bold text-xl">
                    Rare Guitar Notes
                  </h4>
                  <p className="text-zinc-400 mt-2">
                    Hidden arrangements that are difficult or impossible to find
                    elsewhere.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FaMusic className="text-orange-500 text-3xl mt-1" />
                <div>
                  <h4 className="font-bold text-xl">
                    High Quality PDFs
                  </h4>
                  <p className="text-zinc-400 mt-2">
                    Clean notation and tabs for easier learning and practice.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FaCloudUploadAlt className="text-orange-500 text-3xl mt-1" />
                <div>
                  <h4 className="font-bold text-xl">
                    Community Uploads
                  </h4>
                  <p className="text-zinc-400 mt-2">
                    Talented guitarists can upload their own arrangements and
                    share them with thousands of players.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Features */}

        <div className="bg-zinc-900 py-24">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-black text-center mb-16">
              What Makes Us Different
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">

                <FaGuitar className="mx-auto text-5xl text-orange-500 mb-6" />

                <h3 className="text-2xl font-bold mb-4">
                  Exclusive Arrangements
                </h3>

                <p className="text-zinc-400 leading-7">
                  Discover guitar arrangements that aren't available on
                  mainstream platforms.
                </p>

              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">

                <FaUsers className="mx-auto text-5xl text-orange-500 mb-6" />

                <h3 className="text-2xl font-bold mb-4">
                  Music Community
                </h3>

                <p className="text-zinc-400 leading-7">
                  Connect with passionate guitarists, upload your work and
                  request songs you want to learn.
                </p>

              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">

                <FaHeart className="mx-auto text-5xl text-orange-500 mb-6" />

                <h3 className="text-2xl font-bold mb-4">
                  Built With Passion
                </h3>

                <p className="text-zinc-400 leading-7">
                  Every feature is designed by guitar lovers for guitar lovers,
                  making learning more enjoyable.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Vision */}

        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h2 className="text-4xl font-black">
            Our Vision
          </h2>

          <p className="text-zinc-400 text-lg leading-8 mt-8 max-w-4xl mx-auto">
            We believe that no beautiful guitar arrangement should ever be lost.
            Our vision is to build the world's largest collection of rare guitar
            tabs, fingerstyle arrangements, classical pieces, worship songs,
            anime themes, movie soundtracks, and original compositions—making
            them accessible to every guitarist, from beginners to professionals.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default About;