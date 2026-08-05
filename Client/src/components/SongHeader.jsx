import {
  FaHeart,
  FaEye,
  FaDownload,
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
    from-[#0b1220]
    via-[#101827]
    to-black
    shadow-[0_30px_90px_rgba(0,0,0,.55)]
    text-white
  "
    >

      {/* Background Glow */}

      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-orange-500/20 blur-[130px]" />

      <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-[120px]" />

      <div
        className="
      relative
      grid
      gap-14
      p-10 
      grid-cols-1
      lg:grid-cols-[380px_minmax(0,1fr)]
    "
      >

        {/* ================= LEFT SIDE ================= */}

        <div className="flex justify-center lg:justify-start">

          <div className="relative group">

            {/* Glow */}

            <div
              className="
            absolute
            -inset-6
            rounded-[40px]
            bg-orange-500/20
            blur-3xl
            opacity-0
            transition-all
            duration-700
            group-hover:opacity-100
          "
            />

            {/* Vinyl */}

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

            transition-all
            duration-700

            opacity-40

            group-hover:right-[-85px]
            group-hover:rotate-[360deg]
          "
            >

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
            w-full
            max-w-[340px]
            sm:max-w-[340px]
            aspect-square
            rounded-[32px]
            object-cover
            shadow-[0_25px_60px_rgba(0,0,0,.55)]
            transition-all
            duration-700
            group-hover:scale-105
          "
            />

            {/* Overlay */}

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

            {/* Play */}

            <button
              onClick={() => setShowPreview(true)}
              className="
            absolute
            left-1/2
            top-1/2
            z-30

            flex
            h-20
            w-20
            whitespace-nowrap
text-sm
sm:text-lg

            -translate-x-1/2
            -translate-y-1/2

            items-center
            justify-center

            rounded-full

            border
            border-white/30

            bg-white/20

            backdrop-blur-xl

            text-xl
sm:text-2xl
lg:text-3xl

            opacity-0
            scale-75

            transition-all
            duration-500

            group-hover:opacity-100
            group-hover:scale-100
          "
            >
              <FaPlay className="ml-1" />
            </button>

            {/* Badge */}

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

            border
            border-white/10

            px-4
            py-2

            text-sm
            font-semibold
          "
            >
              <FaMusic className="text-orange-400" />
              Guitar In Soul
            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex flex-col justify-center">

          <p className="uppercase tracking-[7px] text-orange-400 font-bold text-sm">
            Guitar Arrangement
          </p>

          <h1
            className="
          mt-3

         text-xl
sm:text-2xl
lg:text-3xl
          sm:text-4xl
          lg:text-6xl

          font-black

          leading-tight
        "
          >
            {song.title}
          </h1>

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

              <p className="text-sm uppercase tracking-widest text-gray-400">
                Artist
              </p>

              <h3 className="text-xl
sm:text-2xl
font-bold
break-words">
                {song.artist}
              </h3>

            </div>

          </div>

          {/* Badges */}

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

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Uploader */}

          <div className="flex
flex-col
sm:flex-row
items-start
sm:items-center
justify-between
gap-6">

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

                <h3 className="text-xl font-bold">
                  {song.uploader?.name || "Unknown"}
                </h3>

              </div>

            </div>

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







          {/* ================= PREMIUM STATS ================= */}

          <div className="mt-10
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5">

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

      hover:-translate-y-2
      hover:border-red-400/40
      hover:bg-red-500/10
    "
            >

              <FaHeart
                className={`
        text-xl
sm:text-2xl
lg:text-3xl

        transition-all
        duration-300

        ${liked
                    ? "text-red-500 scale-125"
                    : "text-red-300 group-hover:text-red-400"
                  }
      `}
              />

              <h2 className="mt-5 text-xl
sm:text-2xl
lg:text-3xl font-bold text-white">
                {likeCount}
              </h2>

              <p className="mt-1 text-gray-400">
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

      hover:-translate-y-2
      hover:border-sky-400/40
      hover:bg-sky-500/10
    "
            >

              <FaEye className="text-xl
sm:text-2xl
lg:text-3xl text-sky-400" />

              <h2 className="mt-5 text-xl
sm:text-2xl
lg:text-3xl font-bold text-white">
                {song.views}
              </h2>

              <p className="mt-1 text-gray-400">
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

      hover:-translate-y-2
      hover:border-green-400/40
      hover:bg-green-500/10
    "
            >

              <FaDownload className="text-xl
sm:text-2xl
lg:text-3xl text-green-400" />

              <h2 className="mt-5 text-xl
sm:text-2xl
lg:text-3xl font-bold text-white">
                {song.downloads}
              </h2>

              <p className="mt-1 text-gray-400">
                Downloads
              </p>

            </div>

          </div>

          {/* ================= ACTION BAR ================= */}

          <div className="mt-10">

            <div
              className={`
      grid
      gap-5

      ${(user?._id === song.uploader?._id || user?.role === "admin")
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }
    `}
            >

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

        h-20
        px-6
        whitespace-nowrap
text-sm
sm:text-lg

        bg-gradient-to-r
        from-orange-500
        to-orange-600

        text-white
        font-semibold
        text-lg

        shadow-lg
        shadow-orange-500/30

        transition-all
        duration-300

        hover:-translate-y-2
        hover:scale-[1.02]
        hover:shadow-orange-500/50
      "
              >
                <FaPlay
                  className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
                />

                Preview Arrangement

              </button>

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

        h-20
        px-6
        whitespace-nowrap
text-sm
sm:text-lg

        bg-zinc-800

        border
        border-zinc-700

        text-white
        font-semibold
        text-lg

        transition-all
        duration-300

        hover:-translate-y-2
        hover:bg-zinc-700
        hover:border-orange-500
      "
              >

                <FaDownload
                  className="
          transition-transform
          duration-300
          group-hover:-translate-y-1
        "
                />

                Download PDF

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

          h-20
          px-6
          whitespace-nowrap
text-sm
sm:text-lg

          bg-red-500/10

          border
          border-red-500/30

          text-red-300
          font-semibold
          text-lg

          transition-all
          duration-300

          hover:-translate-y-2
          hover:bg-red-500
          hover:text-white
          hover:border-red-500
          hover:shadow-xl
          hover:shadow-red-500/30
        "
                  >

                    <FaTrash
                      className="
            transition-transform
            duration-300
            group-hover:rotate-12
          "
                    />

                    Delete Arrangement

                  </button>

                )}
              {/* Save */}

              <button
                onClick={handleFavorite}
                className={`
    group

    flex
    items-center
    justify-center
    gap-3

    rounded-2xl

    h-20
    whitespace-nowrap
text-sm
sm:text-lg

    font-semibold
    text-lg

    transition-all
    duration-300

    hover:-translate-y-2

    ${favorite
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700"
                  }
  `}
              >
                <FaHeart
                  className={`
      text-xl
      transition-transform
      duration-300
      group-hover:scale-125

      ${favorite
                      ? "text-white"
                      : "text-orange-400"
                    }
    `}
                />

                {favorite ? "Saved" : "Save"}

              </button>

            </div>

          </div>

          {/* PDF Preview Modal */}

          {showPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">

              <div className="relative h-[90vh] w-[92vw] overflow-hidden rounded-3xl bg-white shadow-2xl">

                <button
                  onClick={() => setShowPreview(false)}
                  className="
          absolute
          right-5
          top-5
          z-20

          rounded-full

          bg-red-500

          px-4
          py-2

          font-bold
          text-white

          transition
          hover:bg-red-600
        "
                >
                  ✕
                </button>

                <iframe
                  src={song.notationPdf?.url}
                  title="PDF Preview"
                  className="h-full w-full"
                />

              </div>

            </div>
          )}

          {/* ================= CREATOR CARD ================= */}

          <div
            className="
    mt-12

    rounded-[32px]

    border
    border-white/10

    bg-white/5

    backdrop-blur-2xl

    p-8

    transition-all
    duration-300

    hover:border-orange-500/40
    hover:bg-white/10
  "
          >

            <p className="mb-6 text-sm font-bold uppercase tracking-[5px] text-orange-400">
              Arrangement Creator
            </p>

            <div className="flex flex-col gap-8 xl:flex-row lg:items-center lg:justify-between">

              {/* Left Side */}

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
            h-24
            w-24

            rounded-full

            border-4
            border-orange-500

            object-cover

            shadow-2xl
          "
                  />

                  {/* Online Dot */}

                  <span
                    className="
            absolute
            bottom-2
            right-2

            h-5
            w-5

            rounded-full

            border-2
            border-[#111827]

            bg-green-500
          "
                  />

                </div>

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-xl
sm:text-2xl
lg:text-xl
sm:text-2xl
lg:text-3xl font-bold">
                      {song.uploader?.name || "Unknown"}
                    </h2>

                    <span
                      className="
              rounded-full

              bg-sky-500/20

              px-3
              py-1

              text-xs
              font-bold

              text-sky-300
            "
                    >
                      VERIFIED
                    </span>

                  </div>

                  <p className="mt-2 text-gray-400">
                    Passionate Guitar Arrangement Creator
                  </p>

                </div>

              </div>

              {/* Right Side */}

              <div className="grid grid-cols-2 gap-4">

                <div
                  className="
          rounded-2xl

          bg-black/30

          px-8
          h-20
          whitespace-nowrap
text-sm
sm:text-lg

          text-center
        "
                >

                  <p className="text-sm text-gray-400">
                    Uploaded
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {new Date(song.createdAt).toLocaleDateString()}
                  </h3>

                </div>

                <div
                  className="
          rounded-2xl

          bg-black/30

          px-8
          h-20
          whitespace-nowrap
text-sm
sm:text-lg

          text-center
        "
                >

                  <p className="text-sm text-gray-400">
                    Genre
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
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

    overflow-hidden

    rounded-[32px]

    border
    border-white/10

    bg-white/5

    backdrop-blur-2xl
  "
          >

            {/* Header */}

            <div
              className="
      flex
      items-center
      gap-5

      border-b
      border-white/10

      px-8
      py-7
    "
            >

              <div
                className="
        flex

        h-16
        w-16

        items-center
        justify-center

        rounded-2xl

        bg-gradient-to-br
        from-orange-500
        to-orange-600

        text-xl
sm:text-2xl
lg:text-3xl

        shadow-xl
        shadow-orange-500/30
      "
              >
                📖
              </div>

              <div>

                <p className="text-sm uppercase tracking-[6px] text-gray-400">
                  Description
                </p>

                <h2 className="text-xl
sm:text-2xl
lg:text-3xl font-bold text-white">
                  About this Arrangement
                </h2>

              </div>

            </div>

            {/* Body */}

            <div className="p-8">

              <p
                className="
        whitespace-pre-line

        text-lg

        leading-10

        text-gray-300
      "
              >
                {song.description ||
                  "No description has been added for this arrangement yet."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );

};


export default SongHeader;