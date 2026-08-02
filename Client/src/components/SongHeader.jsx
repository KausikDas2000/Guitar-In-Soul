import {
  FaHeart,
  FaEye,
  FaDownload,
  FaUserCircle,
  FaPlay,
  FaMusic,
} from "react-icons/fa";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteSong } from "../services/songService";
import { useNavigate } from "react-router-dom";
import { incrementDownload } from "../services/songService";
import { favoriteSong } from "../services/songService";
const SongHeader = ({
  song,
  liked,
  likeCount,
  handleLike,
}) => {

  const handleDownload = async () => {
    try {
      await incrementDownload(song._id);

      const link = document.createElement("a");

      link.href = song.notationPdf.url.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );

      link.target = "_blank";
      link.click();

    } catch (err) {
      console.log(err);
    }
  };


  const user = JSON.parse(localStorage.getItem("user"));




  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this arrangement?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSong(song._id);

      alert("Arrangement deleted");

      navigate("/arrangements");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };


  const [favorite, setFavorite] = useState(false);

  const handleFavorite = async () => {
    try {
      const res = await favoriteSong(song._id);
      setFavorite(res.favorite);
    } catch (err) {
      console.log(err);
    }
  };

  const [showPreview, setShowPreview] = useState(false);
  return (
    <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl text-white">

      <div className="grid lg:grid-cols-[360px_1fr] gap-10 p-8 lg:p-12">

        {/* Album Cover */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative group">

            <img
              src={song.coverImage?.url}
              alt={song.title}
              className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-3xl shadow-2xl transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl shadow-xl hover:scale-110 transition">
                <FaPlay className="ml-1" />
              </button>
            </div>

          </div>
        </div>

        {/* Details */}
        <div>

          <p className="uppercase tracking-[5px] text-gray-400 font-semibold">
            Arrangement
          </p>

          <h1 className="text-4xl md:text-6xl font-black mt-2 leading-tight">
            {song.title}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-xl text-gray-300">
            <FaMusic />
            <span>{song.artist}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-6">

            <span className="px-5 py-2 rounded-full bg-orange-500/20 border border-orange-400 text-orange-300 font-semibold">
              🎸 {song.difficulty}
            </span>

            <span className="px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-blue-300 font-semibold">
              🎵 {song.genre}
            </span>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">

            <div
              onClick={handleLike}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <FaHeart
                className={`mx-auto text-2xl mb-2 transition-all duration-300 ${liked
                  ? "text-red-500 scale-125"
                  : "text-red-300"
                  }`}
              />

              <p className="text-2xl font-bold">
                {likeCount}
              </p>

              <p className="text-gray-400 text-sm">
                {liked ? "Liked" : "Likes"}
              </p>
            </div>

            <button
              onClick={handleFavorite}
              className={`flex-1 rounded-2xl py-4 transition ${favorite
                ? "bg-yellow-500 text-black"
                : "bg-white/10 text-white"
                }`}
            >
              ⭐ {favorite ? "Saved" : "Save"}
            </button>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center">
              <FaEye className="mx-auto text-sky-400 text-2xl mb-2" />
              <p className="text-2xl font-bold">
                {song.views}
              </p>
              <p className="text-gray-400 text-sm">
                Views
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 text-center">
              <FaDownload className="mx-auto text-green-400 text-2xl mb-2" />
              <p className="text-2xl font-bold">
                {song.downloads}
              </p>
              <p className="text-gray-400 text-sm">
                Downloads
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={() => setShowPreview(true)}
              className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-400 font-semibold flex items-center gap-3 transition hover:scale-105 shadow-lg"
            >
              <FaPlay />
              Preview
            </button>

            {showPreview && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
                <div className="relative w-11/12 h-5/6 bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    ✕
                  </button>

                  <iframe
                    src={song.notationPdf?.url}
                    title="PDF Preview"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleDownload}
              className="px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-black font-semibold flex items-center gap-3 transition"
            >
              <FaDownload />
              Download
            </button>

            {(user?._id === song.uploader?._id || user?.role === "admin") && (
              <button
                onClick={handleDelete}
                className="px-8 py-4 rounded-full border border-red-500/40 bg-red-500/10 hover:bg-red-500 hover:border-red-500 text-red-300 hover:text-white font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <FaTrash />
                Delete Arrangement
              </button>
            )}
          </div>

          {/* Uploader */}
          <div className="mt-12 flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-5">

            <img
              src={
                user?.profileImage?.url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "User"
                )}&background=f97316&color=fff`
              }
              alt=""
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-xl"
            />

            <div>
              <h3 className="text-xl font-bold">
                {song.uploader?.name}
              </h3>

              <p className="text-gray-400">
                Uploaded by
              </p>
            </div>

          </div>

          {/* Description */}
          <div className="mt-10">

            <h3 className="text-2xl font-bold mb-4">
              Description
            </h3>

            <p className="text-gray-300 leading-8">
              {song.description}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SongHeader;