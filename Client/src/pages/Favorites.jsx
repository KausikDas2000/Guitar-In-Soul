import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFavorites } from "../services/songService";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data.favorites);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFavorites = favorites.filter((song) => {
    const query = search.toLowerCase();

    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query) ||
      song.difficulty.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f97316_0%,transparent_35%)] opacity-20" />

          <div className="relative max-w-7xl mx-auto px-8 py-16">
            <span className="text-orange-500 uppercase tracking-[6px] text-sm font-bold">
              Guitar In Soul
            </span>

            <h1 className="mt-3 text-6xl font-black leading-none">
              My Favorites
            </h1>

            <p className="mt-4 text-zinc-400 text-lg max-w-xl">
              Your personal collection of the guitar arrangements you love.
            </p>

            <div className="flex items-center gap-6 mt-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
                <p className="text-3xl font-black">
                  {favorites.length}
                </p>

                <p className="text-zinc-400 text-sm">
                  Saved Arrangements
                </p>
              </div>

              <div className="flex-1 max-w-lg">
                <input
                  type="text"
                  placeholder="Search favourites..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 pb-16">
          {loading ? (
            <div className="flex justify-center py-40">
              <div className="w-14 h-14 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
            </div>
          ) : filteredFavorites.length === 0 ? (
            <div className="text-center py-40">
              <div className="text-8xl mb-6">
                {search ? "🔍" : "⭐"}
              </div>

              <h2 className="text-4xl font-black">
                {search ? "No matching favorites" : "No Favorites Yet"}
              </h2>

              <p className="text-zinc-500 mt-5 text-lg">
                {search
                  ? `No arrangements found for "${search}".`
                  : "Start exploring and save your favourite guitar arrangements."}
              </p>

              {!search && (
                <Link
                  to="/arrangements"
                  className="inline-flex mt-10 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-semibold transition"
                >
                  Browse Arrangements
                </Link>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredFavorites.map((song) => (
                <div
                  key={song._id}
                  className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={song.coverImage?.url}
                      alt={song.title}
                      className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full">
                      ❤️
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold group-hover:text-orange-400 transition">
                      {song.title}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                      {song.artist}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs">
                        {song.genre}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs">
                        {song.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <Link
                        to={`/song/${song._id}`}
                        className="flex-1 text-center bg-orange-500 hover:bg-orange-600 rounded-xl py-3 font-semibold transition"
                      >
                        View Arrangement
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Favorites;