import {
  FaHeart,
  FaEye,
  FaDownload,
  FaUserCircle,
  FaPlay,
  FaMusic,
  FaCalendarAlt,
} from "react-icons/fa";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteSong } from "../services/songService";
import { useNavigate } from "react-router-dom";
import { incrementDownload } from "../services/songService";

const SongHeader = ({
  song,
  liked,
  likeCount,
  handleLike,
  favorite,
  handleFavorite,
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




  const [showPreview, setShowPreview] = useState(false);

  if (!song) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }
  return (
    <section
      className="
      relative

      overflow-hidden

      rounded-[36px]

      border
      border-white/10

      bg-gradient-to-br
      from-[#0f172a]
      via-[#111827]
      to-black

      shadow-[0_25px_80px_rgba(0,0,0,0.45)]

      text-white
    "
    >

      {/* Orange Glow */}

      <div
        className="
        absolute
        -top-32
        -right-32

        h-80
        w-80

        rounded-full

        bg-orange-500/20

        blur-[120px]
      "
      />

      {/* Blue Glow */}

      <div
        className="
        absolute
        bottom-0
        left-0

        h-72
        w-72

        rounded-full

        bg-sky-500/10

        blur-[100px]
      "
      />

      {/* Main Content */}

      <div
        className="
        relative

        grid

        gap-14

        p-10

        lg:grid-cols-[360px_1fr]
      "
      >

        {/* ================= ALBUM COVER ================= */}

        <div className="flex justify-center lg:justify-start">

          <div className="relative group">

            {/* Orange Glow */}
            <div
              className="
        absolute
        -inset-6

        rounded-[40px]

        bg-orange-500/25

        blur-3xl

        opacity-0

        group-hover:opacity-100

        transition-all
        duration-700
      "
            />

            {/* Vinyl Disc */}
            <div
              className="
        absolute

        top-1/2
        right-[-55px]

        -translate-y-1/2

        h-60
        w-60

        rounded-full

        bg-gradient-to-br
        from-zinc-900
        via-zinc-700
        to-black

        border
        border-zinc-600

        shadow-2xl

        opacity-40

        transition-all
        duration-700

        group-hover:right-[-80px]
        group-hover:rotate-[360deg]
      "
            >

              {/* Vinyl Center */}
              <div
                className="
          absolute
          left-1/2
          top-1/2

          h-12
          w-12

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-orange-500

          border-4
          border-zinc-900
        "
              />

            </div>

            {/* Cover */}
            <img
              src={song.coverImage?.url}
              alt={song.title}
              className="
        relative
        z-10

        h-[340px]
        w-[340px]

        rounded-[32px]

        object-cover

        shadow-[0_25px_60px_rgba(0,0,0,0.55)]

        transition-all
        duration-700

        group-hover:scale-105
      "
            />

            {/* Dark Overlay */}
            <div
              className="
        absolute
        inset-0
        z-20

        rounded-[32px]

        bg-gradient-to-t
        from-black/70
        via-transparent
        to-transparent
      "
            />

            {/* Play Button */}
            <button
              className="
        absolute
        left-1/2
        top-1/2
        z-30

        flex
        h-20
        w-20

        -translate-x-1/2
        -translate-y-1/2

        items-center
        justify-center

        rounded-full

        bg-white/20

        backdrop-blur-xl

        border
        border-white/30

        text-3xl
        text-white

        opacity-0
        scale-75

        transition-all
        duration-500

        group-hover:scale-100
        group-hover:opacity-100
      "
            >
              <FaPlay className="ml-1" />
            </button>

            {/* Floating Music Badge */}
            <div
              className="
        absolute
        bottom-5
        left-5
        z-30

        flex
        items-center
        gap-2

        rounded-full

        bg-black/50

        backdrop-blur-xl

        px-4
        py-2

        text-sm
        font-semibold
        text-white

        border
        border-white/10
      "
            >
              <FaMusic className="text-orange-400" />
              Guitar In Soul
            </div>

          </div>

        </div>

        {/* ================= SONG DETAILS ================= */}

        <div className="flex flex-col justify-center">

          {/* Small Label */}
          <p className="uppercase tracking-[6px] text-orange-400 font-bold text-sm">
            Guitar Arrangement
          </p>

          {/* Song Title */}
          <h1
            className="
      mt-3

      text-5xl
      lg:text-6xl

      font-black

      leading-tight

      text-white
    "
          >
            {song.title}
          </h1>

          {/* Artist */}
          <div className="mt-5 flex items-center gap-3">

            <div
              className="
        flex
        h-12
        w-12

        items-center
        justify-center

        rounded-full

        bg-orange-500/20

        text-orange-400
      "
            >
              <FaMusic />
            </div>

            <div>

              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Artist
              </p>

              <h3 className="text-2xl font-bold text-white">
                {song.artist}
              </h3>

            </div>

          </div>

          {/* Genre + Difficulty */}
          <div className="mt-8 flex flex-wrap gap-4">

            <span
              className="
        rounded-full

        border
        border-orange-500/30

        bg-orange-500/15

        px-5
        py-2.5

        font-semibold

        text-orange-300
      "
            >
              🎸 {song.difficulty}
            </span>

            <span
              className="
        rounded-full

        border
        border-sky-500/30

        bg-sky-500/15

        px-5
        py-2.5

        font-semibold

        text-sky-300
      "
            >
              🎵 {song.genre}
            </span>

          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Uploader + Date */}
          <div className="flex flex-wrap items-center justify-between gap-6">

            {/* Uploader */}

            <div className="flex items-center gap-4">

              <img
                src={
                  song?.uploader?.profileImage?.url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    song?.uploader?.name || "User"
                  )}&background=f97316&color=fff`
                }
                alt={song?.uploader?.name || "User"}
                className="
          h-16
          w-16

          rounded-full

          border-2
          border-orange-400

          object-cover
        "
              />

              <div>

                <p className="text-sm text-gray-400">
                  Uploaded by
                </p>

                <h3 className="text-xl font-bold text-white">
                  {song.uploader?.name || "Unknown"}
                </h3>

              </div>

            </div>

            {/* Date */}

            <div
              className="
        rounded-2xl

        border
        border-white/10

        bg-white/5

        px-5
        py-4
      "
            >

              <div className="flex items-center gap-2">

                <FaCalendarAlt className="text-orange-400" />

                <span className="text-gray-300">
                  {new Date(song.createdAt).toLocaleDateString()}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ================= PREMIUM STATS ================= */}

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Likes */}
          <div
            onClick={handleLike}
            className="
      group

      cursor-pointer

      rounded-3xl

      border
      border-white/10

      bg-white/5

      backdrop-blur-xl

      p-6

      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-red-400/40
      hover:bg-red-500/10
    "
          >

            <FaHeart
              className={`
        text-3xl
        transition-all
        duration-300

        ${liked
                  ? "text-red-500 scale-125"
                  : "text-red-300 group-hover:text-red-400"
                }
      `}
            />

            <h2 className="mt-4 text-3xl font-bold">
              {likeCount}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {liked ? "Liked" : "Likes"}
            </p>

          </div>

          {/* Views */}

          <div
            className="
      rounded-3xl

      border
      border-white/10

      bg-white/5

      backdrop-blur-xl

      p-6

      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-sky-400/40
    "
          >

            <FaEye className="text-3xl text-sky-400" />

            <h2 className="mt-4 text-3xl font-bold">
              {song.views}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Views
            </p>

          </div>

          {/* Downloads */}

          <div
            className="
      rounded-3xl

      border
      border-white/10

      bg-white/5

      backdrop-blur-xl

      p-6

      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-green-400/40
    "
          >

            <FaDownload className="text-3xl text-green-400" />

            <h2 className="mt-4 text-3xl font-bold">
              {song.downloads}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Downloads
            </p>

          </div>

          {/* Favorites */}

          <button
            onClick={handleFavorite}
            className={`
      rounded-3xl

      border

      backdrop-blur-xl

      p-6

      text-left

      transition-all
      duration-300

      hover:-translate-y-1

      ${favorite
                ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30"
                : "bg-white/5 border-white/10 hover:border-orange-400/40"
              }
    `}
          >

            <FaHeart
              className={`
        text-3xl

        ${favorite
                  ? "text-white"
                  : "text-orange-400"
                }
      `}
            />

            <h2 className="mt-4 text-2xl font-bold">
              {favorite ? "Saved" : "Save"}
            </h2>

            <p className="mt-1 text-sm opacity-80">
              {favorite
                ? "In your library"
                : "Add to Favorites"}
            </p>

          </button>

        </div>



        {/* ================= ACTION BAR ================= */}

        <div className="mt-10">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Preview */}

            <button
              onClick={() => setShowPreview(true)}
              className="
        group

        flex
        items-center
        justify-center
        gap-3

        rounded-2xl

        py-4

        bg-gradient-to-r
        from-orange-500
        to-orange-600

        text-white
        font-semibold

        shadow-lg
        shadow-orange-500/20

        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-orange-500/40
      "
            >

              <FaPlay
                className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
              />

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

            {/* Download */}

            <button
              onClick={handleDownload}
              className="
        group

        flex
        items-center
        justify-center
        gap-3

        rounded-2xl

        py-4

        bg-zinc-800

        border
        border-zinc-700

        text-white
        font-semibold

        transition-all
        duration-300

        hover:-translate-y-1
        hover:bg-zinc-700
        hover:border-zinc-500
      "
            >

              <FaDownload
                className="
          transition-transform
          duration-300
          group-hover:-translate-y-1
        "
              />

              Download

            </button>

            {/* Favorite */}

            <button
              onClick={handleFavorite}
              className={`
        group

        flex
        items-center
        justify-center
        gap-3

        rounded-2xl

        py-4

        font-semibold

        transition-all
        duration-300

        hover:-translate-y-1

        ${favorite
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                  : "bg-white/5 border border-white/10 text-white hover:bg-red-500 hover:border-red-500"
                }
      `}
            >

              <FaHeart
                className={`
          transition-transform
          duration-300

          ${favorite
                    ? "scale-110"
                    : "group-hover:scale-110"
                  }
        `}
              />

              {favorite ? "Saved" : "Favorite"}

            </button>

            {/* Delete */}

            {(user?._id === song.uploader?._id ||
              user?.role === "admin") && (

                <button
                  onClick={handleDelete}
                  className="
          group

          flex
          items-center
          justify-center
          gap-3

          rounded-2xl

          py-4

          bg-red-500/10

          border
          border-red-500/30

          text-red-300
          font-semibold

          transition-all
          duration-300

          hover:-translate-y-1
          hover:bg-red-500
          hover:text-white
        "
                >

                  <FaTrash
                    className="
            transition-transform
            duration-300
            group-hover:rotate-12
          "
                  />

                  Delete

                </button>

              )}

          </div>

        </div>

        {/* ================= CREATOR CARD ================= */}

        <div
          className="
    mt-12

    rounded-[30px]

    border
    border-white/10

    bg-white/5

    backdrop-blur-2xl

    p-6

    transition-all
    duration-300

    hover:border-orange-400/40
    hover:bg-white/10
  "
        >

          <p className="text-sm uppercase tracking-[5px] text-gray-400 mb-6">
            Arrangement Creator
          </p>

          <div className="flex items-center justify-between flex-wrap gap-6">

            {/* Left */}

            <div className="flex items-center gap-5">

              <div className="relative">

                <img
                  src={
                    song?.uploader?.profileImage?.url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      song?.uploader?.name || "User"
                    )}&background=f97316&color=fff`
                  }
                  alt={song?.uploader?.name || "User"}
                  className="
            h-20
            w-20

            rounded-full

            object-cover

            border-4
            border-orange-500

            shadow-xl
          "
                />

                {/* Online Badge */}

                <div
                  className="
            absolute
            bottom-1
            right-1

            h-5
            w-5

            rounded-full

            bg-green-500

            border-2
            border-zinc-900
          "
                />

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h3 className="text-2xl font-bold">
                    {song.uploader?.name || "Unknown"}
                  </h3>

                  <span
                    className="
              rounded-full

              bg-sky-500/20

              px-2.5
              py-1

              text-xs
              font-bold

              text-sky-300
            "
                  >
                    VERIFIED
                  </span>

                </div>

                <p className="mt-1 text-gray-400">
                  Uploaded this arrangement
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="grid grid-cols-2 gap-4">

              <div
                className="
          rounded-2xl

          bg-black/30

          px-6
          py-4

          text-center
        "
              >

                <p className="text-sm text-gray-400">
                  Uploaded
                </p>

                <h3 className="mt-1 font-bold text-lg">
                  {new Date(song.createdAt).toLocaleDateString()}
                </h3>

              </div>

              <div
                className="
          rounded-2xl

          bg-black/30

          px-6
          py-4

          text-center
        "
              >

                <p className="text-sm text-gray-400">
                  Genre
                </p>

                <h3 className="mt-1 font-bold text-lg">
                  {song.genre}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* ================= ABOUT ARRANGEMENT ================= */}

        <div
          className="
    mt-12

    rounded-[30px]

    border
    border-white/10

    bg-white/5

    backdrop-blur-2xl

    overflow-hidden
  "
        >

          {/* Header */}

          <div
            className="
      flex
      items-center
      gap-4

      px-8
      py-6

      border-b
      border-white/10
    "
          >

            <div
              className="
        flex
        h-14
        w-14

        items-center
        justify-center

        rounded-2xl

        bg-gradient-to-br
        from-orange-500
        to-orange-600

        text-2xl

        shadow-lg
        shadow-orange-500/30
      "
            >
              📖
            </div>

            <div>

              <p className="text-sm uppercase tracking-[5px] text-gray-400">
                Information
              </p>

              <h2 className="text-3xl font-bold">
                About this Arrangement
              </h2>

            </div>

          </div>

          {/* Content */}

          <div className="p-8">

            <p
              className="
        text-lg

        leading-9

        text-gray-300

        whitespace-pre-line
      "
            >
              {song.description ||
                "No description has been added for this arrangement yet."}
            </p>

          </div>

        </div>



      </div>

    </section>
  );
};

export default SongHeader;