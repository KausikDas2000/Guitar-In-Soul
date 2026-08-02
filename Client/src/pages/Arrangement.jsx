import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SongGrid from "../components/SongGrid";

import { getAllSongs } from "../services/songService";

import {
  FaSearch,
  FaPlus,
  FaMusic,
  FaCompactDisc,
  FaFire,
} from "react-icons/fa";

const Arrangements = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [songs, search, genre, difficulty, sort]);

  const fetchSongs = async () => {
    try {
      const data = await getAllSongs();
      setSongs(data.arrangements || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filterSongs = () => {
    let temp = [...songs];

    if (search) {
      temp = temp.filter(
        (song) =>
          song.title.toLowerCase().includes(search.toLowerCase()) ||
          song.artist.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre !== "All") {
      temp = temp.filter((song) => song.genre === genre);
    }

    if (difficulty !== "All") {
      temp = temp.filter((song) => song.difficulty === difficulty);
    }

    if (sort === "Newest") {
      temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sort === "Oldest") {
      temp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (sort === "Most Viewed") {
      temp.sort((a, b) => b.views - a.views);
    }

    setFilteredSongs(temp);
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100">

        {/* HERO */}

        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500">

          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24">

            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-5 py-2 text-white border border-white/20">

              <FaMusic />

              Community Guitar Library

            </span>

            <h1 className="mt-8 text-6xl md:text-7xl font-black leading-tight text-white">

              Discover Amazing

              <br />

              Guitar Arrangements

            </h1>

            <p className="mt-6 text-xl text-orange-100 max-w-3xl leading-9">

              Browse professionally arranged guitar tabs,
              notation PDFs, backing tracks and audio files
              shared by musicians from around the world.

            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">

                <FaCompactDisc className="text-3xl mb-4 text-white" />

                <h2 className="text-4xl font-bold text-white">
                  {songs.length}
                </h2>

                <p className="text-orange-100 mt-2">
                  Arrangements
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">

                <FaMusic className="text-3xl mb-4 text-white" />

                <h2 className="text-4xl font-bold text-white">
                  12
                </h2>

                <p className="text-orange-100 mt-2">
                  Genres
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">

                <FaFire className="text-3xl mb-4 text-white" />

                <h2 className="text-4xl font-bold text-white">
                  Growing
                </h2>

                <p className="text-orange-100 mt-2">
                  Community
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Floating Search */}

        <div className="-mt-12 relative z-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="bg-white rounded-[30px] shadow-2xl border border-gray-100 p-8">

              <div className="flex flex-col xl:flex-row gap-5 items-center">

                <div className="relative flex-1 w-full">

                  <FaSearch className="absolute left-5 top-5 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search by title or artist..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 py-4 pl-14 pr-5 outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition"
                  />

                </div>

                <Link
                  to="/upload"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-300 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >

                  <FaPlus />

                  Upload Arrangement

                </Link>

              </div>


                            {/* Filters */}

              <div className="grid md:grid-cols-3 gap-5 mt-8">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Genre
                  </label>

                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition"
                  >
                    <option>All</option>
                    <option>Rock</option>
                    <option>Pop</option>
                    <option>Blues</option>
                    <option>Jazz</option>
                    <option>Metal</option>
                    <option>Country</option>
                    <option>Acoustic</option>
                    <option>Classical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Difficulty
                  </label>

                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition"
                  >
                    <option>All</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition"
                  >
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Most Viewed</option>
                  </select>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Main Content */}

        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Genre Chips */}

          <div className="flex flex-wrap gap-3 mb-12">

            {[
              "All",
              "Rock",
              "Pop",
              "Jazz",
              "Blues",
              "Metal",
              "Country",
              "Acoustic",
              "Classical",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setGenre(item)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  genre === item
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:bg-orange-50 hover:border-orange-300"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

          {/* Results Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

            <div>

              <h2 className="text-4xl font-black text-gray-900">
                Browse Arrangements
              </h2>

              <p className="text-gray-500 mt-2 text-lg">
                Showing
                <span className="font-bold text-orange-600 mx-2">
                  {filteredSongs.length}
                </span>
                arrangements
              </p>

            </div>

            <div className="mt-6 md:mt-0 bg-white rounded-2xl shadow border px-6 py-4">

              <span className="text-gray-500">
                Total Library
              </span>

              <h3 className="text-3xl font-black text-orange-600 mt-1">
                {songs.length}
              </h3>

            </div>

          </div>

          {/* Song Grid */}

          {filteredSongs.length > 0 ? (

            <SongGrid songs={filteredSongs} />

          ) : (

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 py-24 px-8 text-center">

              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto">

                <FaMusic className="text-5xl text-orange-500" />

              </div>

              <h2 className="text-3xl font-bold mt-8">
                No Arrangements Found
              </h2>

              <p className="mt-4 text-gray-500 max-w-lg mx-auto leading-8">

                We couldn't find any arrangements matching your
                search or selected filters.

              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setGenre("All");
                  setDifficulty("All");
                  setSort("Newest");
                }}
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
              >
                Clear Filters
              </button>

            </div>

          )}
                    {/* Pagination */}

          {filteredSongs.length > 0 && (
            <div className="flex justify-center items-center gap-3 mt-16">

              <button className="px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                Previous
              </button>

              <button className="w-12 h-12 rounded-xl bg-orange-500 text-white font-bold shadow-lg">
                1
              </button>

              <button className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                2
              </button>

              <button className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                3
              </button>

              <button className="px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                Next
              </button>

            </div>
          )}

          {/* CTA Section */}

          <div className="mt-24">

            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-10 md:p-16 shadow-2xl">

              <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">

                <div>

                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
                    🎸 Guitar In Soul
                  </span>

                  <h2 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight">
                    Share Your Music
                    <br />
                    With Thousands
                    <br />
                    of Guitarists
                  </h2>

                  <p className="mt-6 text-orange-100 max-w-xl leading-8 text-lg">
                    Upload your arrangements, notation PDFs,
                    Guitar Pro files and backing tracks to help
                    musicians around the world learn your music.
                  </p>

                </div>

                <div className="flex flex-col sm:flex-row gap-5">

                  <Link
                    to="/upload"
                    className="px-8 py-4 rounded-2xl bg-white text-orange-600 font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    Upload Arrangement
                  </Link>

                  <Link
                    to="/"
                    className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
                  >
                    Explore Home
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
};

export default Arrangements;