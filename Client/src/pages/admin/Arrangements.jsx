import { useEffect, useState } from "react";
import {
  getArrangements,
  deleteArrangement,
} from "../../services/adminService";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaHeart,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Arrangements = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const data = await getArrangements();
      setSongs(data.arrangements);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this arrangement?")) return;

    try {
      await deleteArrangement(id);
      loadSongs();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
            Arrangements
          </h1>

          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Manage uploaded guitar arrangements
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search arrangements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-orange-500"
          />
        </div>

      </div>

      {/* Cards */}
      <div className="space-y-5">

        {filteredSongs.length ? (
          filteredSongs.map((song) => (

            <div
              key={song._id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-orange-500 transition-all duration-300"
            >

              <div className="flex flex-col md:flex-row gap-5">

                {/* Image */}
                <img
                  src={song.coverImage?.url}
                  alt={song.title}
                  className="w-full md:w-36 h-52 md:h-36 rounded-2xl object-cover"
                />

                {/* Info */}
                <div className="flex-1">

                  <h2 className="text-2xl font-bold text-center md:text-left">
                    {song.title}
                  </h2>

                  <p className="text-zinc-400 mt-1 text-center md:text-left">
                    {song.artist}
                  </p>

                  <p className="text-zinc-500 text-sm mt-2 text-center md:text-left">
                    Uploaded by {song.uploader?.name}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-5">

                    <span className="flex items-center gap-2 text-red-400">
                      <FaHeart />
                      {song.likes?.length || 0}
                    </span>

                    <span className="flex items-center gap-2 text-sky-400">
                      <FaEye />
                      {song.views || 0}
                    </span>

                    <span className="flex items-center gap-2 text-green-400">
                      <FaDownload />
                      {song.downloads || 0}
                    </span>

                  </div>

                </div>

                {/* Actions */}
                {/* Actions */}
                <div className="flex gap-3">

                  <button
                    title="Edit"
                    onClick={() =>
                      navigate(`/admin/arrangements/edit/${song._id}`)
                    }
                    className="
      w-12 h-12
      flex items-center justify-center
      rounded-xl
      bg-blue-600 hover:bg-blue-700
      transition
    "
                  >
                    <FaEdit />
                  </button>

                  <button
                    title="Delete"
                    onClick={() => handleDelete(song._id)}
                    className="
      w-12 h-12
      flex items-center justify-center
      rounded-xl
      bg-red-600 hover:bg-red-700
      transition
    "
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>

          ))
        ) : (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl py-16 text-center">

            <h2 className="text-2xl font-bold">
              No arrangements found
            </h2>

            <p className="text-zinc-500 mt-3">
              Try searching with another keyword.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Arrangements;